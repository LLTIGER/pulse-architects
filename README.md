# Pulse Architects - E-commerce Platform

A comprehensive PostgreSQL-powered e-commerce platform for architectural plans, optimized for Vercel deployment with advanced features for digital product sales, licensing, and customer management.

## 🏗️ Architecture Overview

### Technology Stack
- **Framework**: Next.js 14 with App Router
- **Database**: PostgreSQL with Prisma ORM
- **Deployment**: Vercel with Edge Runtime compatibility
- **Authentication**: NextAuth.js v5 with Prisma adapter
- **File Storage**: Cloudinary for secure digital asset management
- **Payments**: Stripe for processing and subscription management
- **Email**: Resend for transactional emails

### Database Design Highlights
- **Multi-tenant ready** with comprehensive user roles and permissions
- **GDPR compliant** with built-in data retention and consent management
- **Audit logging** for all critical operations
- **Optimized indexing** for high-performance queries
- **Scalable architecture** designed for growth

## 📊 Database Schema

### Core Models

#### User Management
- **User**: Authentication and basic profile data with role-based access
- **UserProfile**: Extended profile information with professional details
- **Account/Session**: NextAuth.js integration for OAuth providers

#### Product Catalog
- **Category**: Hierarchical categorization system for architectural plans
- **Plan**: Comprehensive architectural plan data with specifications
- **PlanFile**: Digital files (CAD, PDF, etc.) with security controls
- **PlanImage**: Plan visualization with multiple variants

#### E-commerce Engine
- **Order**: Complete order processing with payment tracking
- **OrderItem**: Individual plan purchases with license types
- **License**: Digital rights management with usage tracking
- **Review**: Customer feedback with moderation system

#### Advanced Features
- **CustomPlanRequest**: Custom architecture request workflow
- **DownloadLog**: Comprehensive download tracking for analytics
- **AuditLog**: System-wide audit trail for compliance
- **SupportTicket**: Integrated customer support system

## 🚀 Vercel Deployment Features

### Database Optimization
```typescript
// Vercel Postgres connection pooling
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")      // Pooled connection
  directUrl = env("DIRECT_URL")       // Direct connection for migrations
}
```

### Edge Runtime Compatibility
- Connection pooling configuration for serverless functions
- Optimized query patterns for reduced cold starts
- Edge-compatible data access patterns
- Automatic connection management

### Performance Features
- **Proper indexing** on all frequently queried fields
- **Optimized relationships** to minimize N+1 queries
- **Paginated queries** with efficient counting
- **Search optimization** with full-text search capabilities

## 🔧 Setup Instructions

### 1. Environment Configuration
```bash
cp .env.example .env.local
```

Configure the following variables:
```env
# Database - Vercel Postgres
DATABASE_URL="postgres://user:password@host:port/database?pgbouncer=true"
DIRECT_URL="postgres://user:password@host:port/database"

# Authentication
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="https://your-domain.com"

# File Storage
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Payments
STRIPE_SECRET_KEY="sk_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_..."
```

### 2. Database Setup
```bash
# Install dependencies
npm install

# Generate Prisma client
npm run db:generate

# Run migrations
npm run db:migrate:deploy

# Seed database (optional)
npm run db:seed
```

### 3. Vercel Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Link project
vercel link

# Set environment variables
vercel env add DATABASE_URL
vercel env add DIRECT_URL
# ... add remaining variables

# Deploy
vercel --prod
```

## 📚 Database Commands

### Development
```bash
npm run db:generate     # Generate Prisma client
npm run db:migrate      # Create and apply migration
npm run db:seed         # Seed with sample data
npm run db:studio       # Open Prisma Studio
npm run db:reset        # Reset database (destructive)
```

### Production
```bash
npm run db:migrate:deploy  # Apply migrations to production
npm run vercel-build       # Vercel build command
```

## 🔒 Security Features

### Data Protection
- **Encrypted sensitive fields** using application-level encryption
- **GDPR compliance** with automatic data retention policies
- **Role-based access control** with granular permissions
- **Audit logging** for all data modifications

### File Security
- **Secure file URLs** with time-limited access tokens
- **License-based downloads** with usage tracking
- **IP-based access logging** for download monitoring
- **Cloudinary security** with signed URLs

### API Security
- **Rate limiting** on all public endpoints
- **Input validation** using Zod schemas
- **SQL injection protection** via Prisma ORM
- **XSS protection** with Content Security Policy

## 📈 Performance Optimization

### Database Performance
```sql
-- Key indexes for optimal performance
CREATE INDEX CONCURRENTLY idx_plans_search ON plans USING gin(to_tsvector('english', title || ' ' || description));
CREATE INDEX CONCURRENTLY idx_plans_filters ON plans (category_id, style, building_type, status, is_active);
CREATE INDEX CONCURRENTLY idx_orders_user_date ON orders (user_id, created_at DESC);
```

### Query Optimization
- **Efficient pagination** using cursor-based pagination for large datasets
- **Strategic eager loading** to prevent N+1 queries
- **Database connection pooling** for serverless optimization
- **Query result caching** at the application level

### Vercel Edge Optimization
- **Edge-compatible queries** using connection pooling
- **Minimal cold start times** with optimized imports
- **CDN optimization** for static assets via Cloudinary
- **Streaming responses** for large data sets

## 🧪 Testing Strategy

### Database Testing
```bash
npm run test                    # Run all tests
npm run test:coverage          # Generate coverage report
npm run db:migrate:reset       # Reset test database
```

### Migration Testing
```typescript
// Safe migration with rollback capability
import { runMigration } from './lib/db-migration'

await runMigration(
  'add_plan_analytics',
  async () => {
    // Migration logic
  },
  async () => {
    // Rollback logic
  }
)
```

## 📊 Analytics & Monitoring

### Built-in Analytics
- **Plan performance tracking** (views, downloads, revenue)
- **User behavior analysis** (favorites, search patterns)
- **Sales metrics** (conversion rates, top-performing plans)
- **Download analytics** (license usage, geographic distribution)

### System Monitoring
- **Database health checks** with automatic alerting
- **Performance monitoring** for query optimization
- **Error tracking** with detailed stack traces
- **Audit trail analysis** for security monitoring

## 🔄 Data Migration Strategy

### Production Deployment
1. **Pre-deployment checks** validate schema and data integrity
2. **Zero-downtime migrations** using Vercel's deployment pipeline
3. **Automatic rollback** capability for failed deployments
4. **Data validation** post-migration with integrity checks

### Backup Strategy
- **Automated daily backups** via Vercel Postgres
- **Point-in-time recovery** for data protection
- **Cross-region replication** for disaster recovery
- **Manual backup triggers** for critical operations

## 📝 API Documentation

### Core Endpoints
```typescript
// Plans API
GET /api/plans                 // Browse plans with filtering
GET /api/plans/[slug]          // Get plan details
POST /api/plans                // Create plan (admin)

// Orders API
POST /api/orders               // Create order
GET /api/orders/[id]           // Get order details
POST /api/orders/[id]/download // Download purchased files

// User API
GET /api/user/profile          // Get user profile
PUT /api/user/profile          // Update profile
GET /api/user/orders           // Get user orders
GET /api/user/licenses         // Get user licenses
```

### Webhook Endpoints
```typescript
POST /api/stripe/webhook       // Stripe payment webhooks
POST /api/download/webhook     // Download completion webhooks
```

## 🤝 Contributing

### Development Workflow
1. Create feature branch from `main`
2. Make changes with proper testing
3. Run `npm run db:validate` to ensure schema integrity
4. Submit PR with migration files if schema changes
5. Deploy to staging for testing before production

### Database Changes
1. Create migration: `npm run db:migrate`
2. Update TypeScript types if needed
3. Add proper indexes for new queries
4. Test migration with production-like data
5. Document breaking changes in PR

## 📄 License

This project is proprietary and confidential. All rights reserved.

---

**Pulse Architects** - Building the future of architectural plan distribution with enterprise-grade reliability and security.