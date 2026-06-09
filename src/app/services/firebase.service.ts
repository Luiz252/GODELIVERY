import { Injectable, signal, computed } from '@angular/core';
import { initializeApp, FirebaseApp } from 'firebase/app';
import {
  getAuth,
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  updateProfile,
  sendPasswordResetEmail,
  confirmPasswordReset,
} from 'firebase/auth';
import {
  getFirestore,
  Firestore,
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  Timestamp,
} from 'firebase/firestore';
import { environment } from '../../environments/environment';
import { UserRole } from './order.service';

// Interfaces de dados
export interface AppUser {
  uid: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  photoURL?: string;
}

export interface Restaurant {
  id: string;
  name: string;
  image: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: string;
  description?: string;
  address?: string;
  categories?: string[];
}

export interface Product {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: string;
  priceValue: number;
  image: string;
  category: string;
  rating?: number;
  reviews?: number;
}

export interface Order {
  id?: string;
  userId: string;
  restaurantId: string;
  restaurantName: string;
  items: Array<{
    id: string;
    name: string;
    price: string;
    priceValue: number;
    quantity: number;
  }>;
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'on_the_way' | 'delivered' | 'cancelled';
  address: string;
  createdAt: Date;
}

export interface UserFavorite {
  restaurantId: string;
}

const DEMO_STORAGE_KEY = 'godelivery_demo_user';

interface DemoCredential {
  aliases: string[];
  password: string;
  user: AppUser;
}

const DEMO_CREDENTIALS: DemoCredential[] = [
  {
    aliases: ['cliente', 'cliente@local.dev'],
    password: 'cliente',
    user: { uid: 'demo-cliente', name: 'Cliente', email: 'cliente@local.dev', phone: '(11) 99999-0001', role: 'customer' },
  },
  {
    aliases: ['cozinha', 'cozinha@local.dev'],
    password: 'cozinha',
    user: { uid: 'demo-cozinha', name: 'Equipe Cozinha', email: 'cozinha@local.dev', phone: '', role: 'kitchen' },
  },
  {
    aliases: ['motoboy', 'motoboy@local.dev'],
    password: 'motoboy',
    user: { uid: 'demo-motoboy', name: 'Carlos Motoboy', email: 'motoboy@local.dev', phone: '(11) 98888-0002', role: 'delivery' },
  },
  {
    aliases: ['dono', 'dono@local.dev'],
    password: 'dono',
    user: { uid: 'demo-dono', name: 'Dono do Estabelecimento', email: 'dono@local.dev', phone: '(11) 97777-0003', role: 'owner' },
  },
  {
    aliases: ['admin', 'admin@admin.com', 'admin@local.dev'],
    password: 'admin',
    user: { uid: 'demo-dono', name: 'Dono do Estabelecimento', email: 'dono@local.dev', phone: '(11) 97777-0003', role: 'owner' },
  },
];

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private app!: FirebaseApp;
  public auth!: Auth;
  public db!: Firestore;
  private isDemoMode = false;

  // Estado reativo do usuário
  currentUser = signal<AppUser | null>(null);
  isLoggedIn = computed(() => !!this.currentUser());

  // Cache de dados
  restaurants = signal<Restaurant[]>([]);
  isLoadingRestaurants = signal(false);

  constructor() {
    try {
      const cfg = environment.firebase || {} as any;

      // Evita inicializar com placeholders do template (causa tela branca / erro fatal)
      const hasRealConfig =
        cfg.apiKey &&
        !String(cfg.apiKey).includes('SUA_') &&
        cfg.projectId &&
        !String(cfg.projectId).includes('SEU_');

      if (hasRealConfig) {
        this.app = initializeApp(cfg);
        this.auth = getAuth(this.app);
        this.db = getFirestore(this.app);

        // Listener de estado de autenticação (só se configurado)
        onAuthStateChanged(this.auth, async (firebaseUser) => {
          if (firebaseUser) {
            const userDoc = await getDoc(doc(this.db, 'users', firebaseUser.uid));
            if (userDoc.exists()) {
              const userData = userDoc.data() as Omit<AppUser, 'uid'>;
              this.currentUser.set({ uid: firebaseUser.uid, ...userData });
            } else {
              this.currentUser.set({
                uid: firebaseUser.uid,
                name: firebaseUser.displayName || 'Usuário',
                email: firebaseUser.email || '',
                phone: '',
                role: 'customer',
              });
            }
          } else {
            this.currentUser.set(null);
          }
        });
      } else {
        this.isDemoMode = true;
        console.warn(
          '[FirebaseService] Configuração Firebase com placeholders detectada (environment.ts). ' +
          'O app vai subir em modo demo. Use cliente/cliente, cozinha/cozinha, motoboy/motoboy ou dono/admin.'
        );
        this.restoreDemoSession();
      }
    } catch (err) {
      console.error('[FirebaseService] Falha ao inicializar Firebase. App rodando em modo limitado.', err);
      // Não deixa o erro subir e causar tela branca
    }
  }

  // ==================== AUTH ====================

  private restoreDemoSession(): void {
    try {
      const stored = localStorage.getItem(DEMO_STORAGE_KEY);
      if (stored) {
        const user = JSON.parse(stored) as AppUser;
        if (!user.role) {
          user.role = 'customer';
        }
        this.currentUser.set(user);
      }
    } catch {
      localStorage.removeItem(DEMO_STORAGE_KEY);
    }
  }

  private findDemoCredential(email: string, password: string): AppUser | null {
    const normalized = email.trim().toLowerCase();
    const match = DEMO_CREDENTIALS.find(
      (cred) => cred.password === password && cred.aliases.includes(normalized)
    );
    return match ? { ...match.user } : null;
  }

  private loginDemoUser(user: AppUser): AppUser {
    this.currentUser.set(user);
    localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(user));
    return user;
  }

  async signup(email: string, password: string, name: string, phone: string): Promise<AppUser> {
    if (!this.auth || !this.db) {
      throw new Error('Firebase não configurado. Preencha as credenciais reais no environment.ts para cadastrar/login.');
    }
    const cred = await createUserWithEmailAndPassword(this.auth, email, password);

    await updateProfile(cred.user, { displayName: name });

    const user: AppUser = {
      uid: cred.user.uid,
      name,
      email,
      phone,
      role: 'customer',
    };

    await setDoc(doc(this.db, 'users', cred.user.uid), {
      name,
      email,
      phone,
      createdAt: Timestamp.now(),
    });

    this.currentUser.set(user);
    return user;
  }

  async login(email: string, password: string): Promise<AppUser> {
    if (!this.auth || !this.db) {
      const demoUser = this.findDemoCredential(email, password);
      if (demoUser) {
        return this.loginDemoUser(demoUser);
      }
      throw new Error('auth/invalid-credential');
    }
    const cred = await signInWithEmailAndPassword(this.auth, email, password);
    const userDoc = await getDoc(doc(this.db, 'users', cred.user.uid));

    let user: AppUser;
    if (userDoc.exists()) {
      const data = userDoc.data() as Partial<Omit<AppUser, 'uid'>>;
      user = {
        uid: cred.user.uid,
        name: data.name ?? cred.user.displayName ?? 'Usuário',
        email: data.email ?? cred.user.email ?? '',
        phone: data.phone ?? '',
        role: data.role ?? 'customer',
        photoURL: data.photoURL,
      };
    } else {
      user = {
        uid: cred.user.uid,
        name: cred.user.displayName || 'Usuário',
        email: cred.user.email || '',
        phone: '',
        role: 'customer',
      };
    }

    this.currentUser.set(user);
    return user;
  }

  async logout(): Promise<void> {
    if (this.auth) {
      await signOut(this.auth);
    }
    if (this.isDemoMode) {
      localStorage.removeItem(DEMO_STORAGE_KEY);
    }
    this.currentUser.set(null);
  }

  async resetPassword(email: string): Promise<void> {
    if (!this.auth) throw new Error('Firebase não configurado.');
    await sendPasswordResetEmail(this.auth, email);
  }

  async confirmPasswordReset(oobCode: string, newPassword: string): Promise<void> {
    if (!this.auth) throw new Error('Firebase não configurado.');
    await confirmPasswordReset(this.auth, oobCode, newPassword);
  }

  // Atualiza dados do perfil
  async updateUserProfile(updates: Partial<Pick<AppUser, 'name' | 'phone'>>): Promise<void> {
    const user = this.currentUser();
    if (!user) throw new Error('Usuário não autenticado');
    if (!this.db) {
      // demo: atualiza só o signal local
      this.currentUser.set({ ...user, ...updates });
      return;
    }

    const userRef = doc(this.db, 'users', user.uid);
    await updateDoc(userRef, updates as any);

    this.currentUser.set({ ...user, ...updates });
  }

  // ==================== RESTAURANTS ====================

  async loadRestaurants(): Promise<Restaurant[]> {
    this.isLoadingRestaurants.set(true);
    try {
      if (!this.db) {
        // Modo demo: usa dados locais para a UI não ficar vazia
        const demo = this.getDemoRestaurants();
        this.restaurants.set(demo);
        return demo;
      }
      const snap = await getDocs(collection(this.db, 'restaurants'));
      const list: Restaurant[] = snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Restaurant, 'id'>) }));
      this.restaurants.set(list);
      return list;
    } finally {
      this.isLoadingRestaurants.set(false);
    }
  }

  private getDemoRestaurants(): Restaurant[] {
    return [
      { id: '1', name: 'Sushi Premium', image: 'https://images.unsplash.com/photo-1700324822763-956100f79b0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXNoaSUyMGNvbWJvJTIwamFwYW5lc2V8ZW58MXx8fHwxNzcyNjA0MDE5fDA&ixlib=rb-4.1.0&q=80&w=1080', rating: 4.8, deliveryTime: '30-40 min', deliveryFee: 'Grátis', description: 'O melhor sushi de São Paulo.', address: 'Rua Augusta, 1500', categories: ['Japonesa', 'Sushi'] },
      { id: '2', name: 'Pasta & Vino', image: 'https://images.unsplash.com/photo-1680405229153-a753d043c4ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwcmVzdGF1cmFudCUyMHBhc3RhfGVufDF8fHx8MTc3MjUxMzA3OXww&ixlib=rb-4.1.0&q=80&w=1080', rating: 4.6, deliveryTime: '25-35 min', deliveryFee: 'R$ 5,00', description: 'Massas artesanais e vinhos.', address: 'Rua das Flores, 142', categories: ['Italiana', 'Massas'] },
      { id: '3', name: 'Tacos Mexicanos', image: 'https://images.unsplash.com/photo-1666307551772-943e4b88d564?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXhpY2FuJTIwdGFjb3MlMjByZXN0YXVyYW50fGVufDF8fHx8MTc3MjU2NzMzOHww&ixlib=rb-4.1.0&q=80&w=1080', rating: 4.7, deliveryTime: '20-30 min', deliveryFee: 'R$ 3,50', description: 'Autêntica comida mexicana.', address: 'Av. Paulista, 900', categories: ['Mexicana'] },
      { id: '4', name: 'Salad Bar', image: 'https://images.unsplash.com/photo-1649531794884-b8bb1de72e68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxhZCUyMGhlYWx0aHklMjBmb29kJTIwYm93bHxlbnwxfHx8fDE3NzI1NDg2ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080', rating: 4.9, deliveryTime: '15-25 min', deliveryFee: 'Grátis', description: 'Opções saudáveis e veganas.', address: 'Rua Oscar Freire, 500', categories: ['Saudável'] },
    ];
  }

  async getRestaurantById(id: string): Promise<Restaurant | null> {
    if (!this.db) {
      const demo = this.getDemoRestaurants().find(r => r.id === id);
      return demo || null;
    }
    const ref = doc(this.db, 'restaurants', id);
    const snap = await getDoc(ref);
    if (!snap.exists()) return null;
    return { id: snap.id, ...(snap.data() as Omit<Restaurant, 'id'>) };
  }

  // ==================== PRODUCTS ====================

  async getProductsByRestaurant(restaurantId: string): Promise<Product[]> {
    if (!this.db) {
      // Demo: alguns produtos para o restaurante 2 (Pasta & Vino) e fallback
      return this.getDemoProducts().filter(p => p.restaurantId === restaurantId || restaurantId === '2');
    }
    const q = query(collection(this.db, 'products'), where('restaurantId', '==', restaurantId));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Product, 'id'>) }));
  }

  async getProductById(id: string): Promise<Product | null> {
    if (!this.db) {
      return this.getDemoProducts().find(p => p.id === id) || null;
    }
    const ref = doc(this.db, 'products', id);
    const snap = await getDoc(ref);
    if (!snap.exists()) return null;
    return { id: snap.id, ...(snap.data() as Omit<Product, 'id'>) };
  }

  async getAllProducts(): Promise<Product[]> {
    if (!this.db) {
      return this.getDemoProducts();
    }
    const snap = await getDocs(collection(this.db, 'products'));
    return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Product, 'id'>) }));
  }

  private getDemoProducts(): Product[] {
    return [
      { id: 'p1', restaurantId: '2', name: 'Pizza Margherita', description: 'Molho de tomate, mussarela fresca, manjericão e azeite', price: 'R$ 45,90', priceValue: 45.9, image: 'https://images.unsplash.com/photo-1667207394004-acb6aaf4790e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJnaGVyaXRhJTIwcGl6emElMjBjbG9zZXxlbnwxfHx8fDE3NzI2MDI2OTR8MA&ixlib=rb-4.1.0&q=80&w=1080', category: 'Pizzas', rating: 4.8, reviews: 127 },
      { id: 'p2', restaurantId: '2', name: 'Pizza Calabresa', description: 'Calabresa fatiada, cebola roxa, azeitonas e molho especial', price: 'R$ 42,90', priceValue: 42.9, image: 'https://images.unsplash.com/photo-1631347155591-c162abe23014?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXBwZXJvbmklMjBwaXp6YSUyMHNsaWNlfGVufDF8fHx8MTc3MjU4NzkyMHww&ixlib=rb-4.1.0&q=80&w=1080', category: 'Pizzas', rating: 4.7, reviews: 98 },
      { id: 'p3', restaurantId: '2', name: 'Lasanha Bolonhesa', description: 'Massa fresca artesanal, molho bolonhesa com carne e queijos', price: 'R$ 38,90', priceValue: 38.9, image: 'https://images.unsplash.com/photo-1767065583952-e932c354bca6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXNhZ25hJTIwYmFrZWQlMjBkaXNofGVufDF8fHx8MTc3MjY5NzMwN3ww&ixlib=rb-4.1.0&q=80&w=1080', category: 'Massas', rating: 4.9, reviews: 156 },
      { id: 'p4', restaurantId: '2', name: 'Spaghetti Carbonara', description: 'Bacon crocante, ovos caipira, parmesão e pimenta preta', price: 'R$ 36,90', priceValue: 36.9, image: 'https://images.unsplash.com/photo-1764586119076-61711e8ed25a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJib25hcmElMjBwYXN0YSUyMGNyZWFteXxlbnwxfHx8fDE3NzI2NDI3MTB8MA&ixlib=rb-4.1.0&q=80&w=1080', category: 'Massas', rating: 4.8, reviews: 143 },
      { id: 's1', restaurantId: '1', name: 'Combo 30 Peças', description: 'Seleção variada de sushis e sashimis frescos', price: 'R$ 89,90', priceValue: 89.9, image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXNoaSUyMGNvbWJvJTIwamFwYW5lc2V8ZW58MXx8fHwxNzcyNjA0MDE5fDA&ixlib=rb-4.1.0&q=80&w=1080', category: 'Combos', rating: 4.9, reviews: 210 },
      { id: 't1', restaurantId: '3', name: 'Taco de Carne', description: 'Carne moída temperada, alface, queijo e molho picante', price: 'R$ 18,90', priceValue: 18.9, image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWNvJTIwY2FybmV8ZW58MXx8fHwxNzcyNjA0MDIxfDA&ixlib=rb-4.1.0&q=80&w=1080', category: 'Tacos', rating: 4.6, reviews: 78 },
      { id: 'sa1', restaurantId: '4', name: 'Bowl de Quinoa', description: 'Quinoa, abacate, grão de bico, tomate e molho de limão', price: 'R$ 29,90', priceValue: 29.9, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3dsJTIwc2FsYWR8ZW58MXx8fHwxNzcyNjA0MDIyfDA&ixlib=rb-4.1.0&q=80&w=1080', category: 'Bowls', rating: 4.9, reviews: 134 },
    ];
  }

  // ==================== FAVORITES ====================

  async getFavorites(userId: string): Promise<string[]> {
    if (!this.db) {
      return []; // demo: sem favoritos persistidos
    }
    const snap = await getDocs(collection(this.db, 'users', userId, 'favorites'));
    return snap.docs.map((d) => d.id);
  }

  async toggleFavorite(userId: string, restaurantId: string): Promise<boolean> {
    if (!this.db) {
      // Em demo apenas alterna visualmente no componente que chamou (home já faz isso local)
      return true;
    }
    const favRef = doc(this.db, 'users', userId, 'favorites', restaurantId);
    const snap = await getDoc(favRef);

    if (snap.exists()) {
      await deleteDoc(favRef);
      return false;
    } else {
      await setDoc(favRef, { createdAt: Timestamp.now() });
      return true;
    }
  }

  // ==================== ORDERS ====================

  async createOrder(order: Omit<Order, 'id' | 'createdAt'>): Promise<string> {
    if (!this.db) {
      // Em demo: simula criação (o componente de confirmação já mostra sucesso)
      console.log('[Demo] Pedido criado localmente (sem Firebase):', order);
      return 'demo-' + Date.now();
    }
    const orderData = {
      ...order,
      createdAt: Timestamp.now(),
    };
    const ref = await addDoc(collection(this.db, 'orders'), orderData);
    return ref.id;
  }

  async getUserOrders(userId: string): Promise<Order[]> {
    if (!this.db) {
      return []; // orders-screen já cai para mocks quando vazio
    }
    const q = query(collection(this.db, 'orders'), where('userId', '==', userId), orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map((d) => {
      const data = d.data() as any;
      return {
        id: d.id,
        ...data,
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(),
      } as Order;
    });
  }

  async getOrderById(orderId: string): Promise<Order | null> {
    if (!this.db) {
      return null;
    }
    const ref = doc(this.db, 'orders', orderId);
    const snap = await getDoc(ref);
    if (!snap.exists()) return null;
    const data = snap.data() as any;
    return {
      id: snap.id,
      ...data,
      createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(),
    } as Order;
  }

  // ==================== SEED DATA (para inicialização) ====================

  async seedInitialDataIfEmpty(): Promise<void> {
    if (!this.db) {
      // Em modo demo os dados já vêm via getDemo* – não precisa seed no Firestore
      return;
    }
    const restSnap = await getDocs(collection(this.db, 'restaurants'));
    if (!restSnap.empty) return; // Já tem dados

    console.log('[Firebase] Seeding initial data...');

    // Restaurantes (baseado no mock atual)
    const restaurantsSeed: Array<Omit<Restaurant, 'id'> & { id: string }> = [
      {
        id: '1',
        name: 'Sushi Premium',
        image: 'https://images.unsplash.com/photo-1700324822763-956100f79b0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXNoaSUyMGphcGFuZXNlJTIwZm9vZHxlbnwxfHx8fDE3NzI0OTI0Njh8MA&ixlib=rb-4.1.0&q=80&w=1080',
        rating: 4.8,
        deliveryTime: '30-40 min',
        deliveryFee: 'Grátis',
        description: 'O melhor sushi de São Paulo com ingredientes frescos importados do Japão.',
        address: 'Rua Augusta, 1500 – Consolação, São Paulo – SP',
        categories: ['Japonesa', 'Sushi'],
      },
      {
        id: '2',
        name: 'Pasta & Vino',
        image: 'https://images.unsplash.com/photo-1680405229153-a753d043c4ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwcmVzdGF1cmFudCUyMHBhc3RhfGVufDF8fHx8MTc3MjUxMzA3OXww&ixlib=rb-4.1.0&q=80&w=1080',
        rating: 4.6,
        deliveryTime: '25-35 min',
        deliveryFee: 'R$ 5,00',
        description: 'Restaurante italiano clássico com massas artesanais e vinhos selecionados.',
        address: 'Rua das Flores, 142 – Jardins, São Paulo – SP',
        categories: ['Italiana', 'Massas', 'Pizza'],
      },
      {
        id: '3',
        name: 'Tacos Mexicanos',
        image: 'https://images.unsplash.com/photo-1666307551772-943e4b88d564?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXhpY2FuJTIwdGFjb3MlMjByZXN0YXVyYW50fGVufDF8fHx8MTc3MjU2NzMzOHww&ixlib=rb-4.1.0&q=80&w=1080',
        rating: 4.7,
        deliveryTime: '20-30 min',
        deliveryFee: 'R$ 3,50',
        description: 'Autêntica comida mexicana com tacos, burritos e margaritas frescas.',
        address: 'Av. Paulista, 900 – Bela Vista, São Paulo – SP',
        categories: ['Mexicana', 'Tacos'],
      },
      {
        id: '4',
        name: 'Salad Bar',
        image: 'https://images.unsplash.com/photo-1649531794884-b8bb1de72e68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxhZCUyMGhlYWx0aHklMjBmb29kJTIwYm93bHxlbnwxfHx8fDE3NzI1NDg2ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        rating: 4.9,
        deliveryTime: '15-25 min',
        deliveryFee: 'Grátis',
        description: 'Saladas frescas, bowls saudáveis e opções vegetarianas e veganas.',
        address: 'Rua Oscar Freire, 500 – Jardins, São Paulo – SP',
        categories: ['Saudável', 'Saladas'],
      },
    ];

    for (const r of restaurantsSeed) {
      const { id, ...rest } = r;
      await setDoc(doc(this.db, 'restaurants', id), rest);
    }

    // Produtos (associados principalmente ao Pasta & Vino id=2, mas alguns para outros)
    const productsSeed: Array<Omit<Product, 'id'> & { id: string }> = [
      // Pasta & Vino (id 2)
      { id: 'p1', restaurantId: '2', name: 'Pizza Margherita', description: 'Molho de tomate, mussarela fresca, manjericão e azeite', price: 'R$ 45,90', priceValue: 45.9, image: 'https://images.unsplash.com/photo-1667207394004-acb6aaf4790e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJnaGVyaXRhJTIwcGl6emElMjBjbG9zZXxlbnwxfHx8fDE3NzI2MDI2OTR8MA&ixlib=rb-4.1.0&q=80&w=1080', category: 'Pizzas', rating: 4.8, reviews: 127 },
      { id: 'p2', restaurantId: '2', name: 'Pizza Calabresa', description: 'Calabresa fatiada, cebola roxa, azeitonas e molho especial', price: 'R$ 42,90', priceValue: 42.9, image: 'https://images.unsplash.com/photo-1631347155591-c162abe23014?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXBwZXJvbmklMjBwaXp6YSUyMHNsaWNlfGVufDF8fHx8MTc3MjU4NzkyMHww&ixlib=rb-4.1.0&q=80&w=1080', category: 'Pizzas', rating: 4.7, reviews: 98 },
      { id: 'p3', restaurantId: '2', name: 'Lasanha Bolonhesa', description: 'Massa fresca artesanal, molho bolonhesa com carne e queijos', price: 'R$ 38,90', priceValue: 38.9, image: 'https://images.unsplash.com/photo-1767065583952-e932c354bca6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXNhZ25hJTIwYmFrZWQlMjBkaXNofGVufDF8fHx8MTc3MjY5NzMwN3ww&ixlib=rb-4.1.0&q=80&w=1080', category: 'Massas', rating: 4.9, reviews: 156 },
      { id: 'p4', restaurantId: '2', name: 'Spaghetti Carbonara', description: 'Bacon crocante, ovos caipira, parmesão e pimenta preta', price: 'R$ 36,90', priceValue: 36.9, image: 'https://images.unsplash.com/photo-1764586119076-61711e8ed25a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJib25hcmElMjBwYXN0YSUyMGNyZWFteXxlbnwxfHx8fDE3NzI2NDI3MTB8MA&ixlib=rb-4.1.0&q=80&w=1080', category: 'Massas', rating: 4.8, reviews: 143 },
      { id: 'p5', restaurantId: '2', name: 'Tiramisù', description: 'Sobremesa italiana clássica com café espresso e mascarpone', price: 'R$ 18,90', priceValue: 18.9, image: 'https://images.unsplash.com/photo-1732869931523-8fd0437da0f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aXJhbWlzdSUyMGRlc3NlcnQlMjBpdGFsaWFufGVufDF8fHx8MTc3MjY0MjUwNHww&ixlib=rb-4.1.0&q=80&w=1080', category: 'Sobremesas', rating: 4.9, reviews: 189 },

      // Sushi Premium (id 1) - alguns produtos
      { id: 's1', restaurantId: '1', name: 'Combo 30 Peças', description: 'Seleção variada de sushis e sashimis frescos', price: 'R$ 89,90', priceValue: 89.9, image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXNoaSUyMGNvbWJvJTIwamFwYW5lc2V8ZW58MXx8fHwxNzcyNjA0MDE5fDA&ixlib=rb-4.1.0&q=80&w=1080', category: 'Combos', rating: 4.9, reviews: 210 },
      { id: 's2', restaurantId: '1', name: 'Sashimi de Salmão', description: 'Fatias frescas de salmão com molho shoyu e wasabi', price: 'R$ 42,00', priceValue: 42, image: 'https://images.unsplash.com/photo-1617191888888-6a5b1f1f1f1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYXNoaW1pJTIwc2FsbW9ufGVufDF8fHx8MTc3MjYwNDAyMHww&ixlib=rb-4.1.0&q=80&w=1080', category: 'Sashimi', rating: 4.8, reviews: 95 },

      // Tacos (id 3)
      { id: 't1', restaurantId: '3', name: 'Taco de Carne', description: 'Carne moída temperada, alface, queijo e molho picante', price: 'R$ 18,90', priceValue: 18.9, image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWNvJTIwY2FybmV8ZW58MXx8fHwxNzcyNjA0MDIxfDA&ixlib=rb-4.1.0&q=80&w=1080', category: 'Tacos', rating: 4.6, reviews: 78 },

      // Salad (id 4)
      { id: 'sa1', restaurantId: '4', name: 'Bowl de Quinoa', description: 'Quinoa, abacate, grão de bico, tomate e molho de limão', price: 'R$ 29,90', priceValue: 29.9, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3dsJTIwc2FsYWR8ZW58MXx8fHwxNzcyNjA0MDIyfDA&ixlib=rb-4.1.0&q=80&w=1080', category: 'Bowls', rating: 4.9, reviews: 134 },
    ];

    for (const p of productsSeed) {
      const { id, ...prod } = p;
      await setDoc(doc(this.db, 'products', id), prod);
    }

    console.log('[Firebase] Seed completed!');
  }
}
