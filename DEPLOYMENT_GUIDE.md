# Pulse Architects - Vercel Deployment Guide

Complete guide for deploying the Pulse Architects e-commerce platform to Vercel with PostgreSQL database integration.

## 🚀 Pre-Deployment Checklist

### 1. Vercel Account Setup
- [ ] Create Vercel account at [vercel.com](https://vercel.com)
- [ ] Install Vercel CLI: `npm i -g vercel`
- [ ] Link project: `vercel link`
- [ ] Verify team/personal account permissions

### 2. Database Setup (Vercel Postgres)
- [ ] Enable Vercel Postgres in project dashboard
- [ ] Create production database instance
- [ ] Create staging database instance (recommended)
- [ ] Note connection strings for configuration

### 3. Third-Party Services
- [ ] **Cloudinary**: Create account and note cloud name, API key/secret
- [ ] **Stripe**: Set up account, get API keys, configure webhooks
- [ ] **Resend**: Create account for email service
- [ ] **Google OAuth**: Set up OAuth app for authentication
- [ ] **GitHub OAuth**: Set up OAuth app (optional)

## 🔧 Environment Configuration

### 1. Vercel Environment Variables

Set these in Vercel Dashboard → Project → Settings → Environment Variables:

#### Database Configuration
```bash
# Production Database (from Vercel Postgres)
DATABASE_URL="postgres://username:password@host:port/database?sslmode=require&pgbouncer=true"
DIRECT_URL="postgres://username:password@host:port/database?sslmode=require"
```

#### Authentication
```bash
NEXTAUTH_SECRET="your-super-secret-32-char-string"
NEXTAUTH_URL="https://your-domain.vercel.app"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# GitHub OAuth (optional)
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"
```

#### File Storage (Cloudinary)
```bash
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET="your-upload-preset"
```

#### Payments (Stripe)
```bash
STRIPE_SECRET_KEY="sk_live_..." # Use sk_test_ for testing
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..." # Use pk_test_ for testing
STRIPE_WEBHOOK_SECRET="whsec_..."
```

#### Email Service (Resend)
```bash
RESEND_API_KEY="re_..."
FROM_EMAIL="noreply@yourdomain.com"
```

#### Feature Flags & Security
```bash
ENABLE_AUDIT_LOGGING="true"
ENABLE_CUSTOM_REQUESTS="true"
ENABLE_GUEST_BROWSING="true"
ENABLE_REVIEWS="true"
RATE_LIMIT_MAX_REQUESTS="100"
RATE_LIMIT_WINDOW_MS="900000"
MAX_FILE_SIZE="52428800"
MAX_FILES_PER_PLAN="20"
```

### 2. Environment Variable Setup Script

```bash
#!/bin/bash
# deploy-env.sh - Set Vercel environment variables

# Database
vercel env add DATABASE_URL production
vercel env add DIRECT_URL production

# Authentication
vercel env add NEXTAUTH_SECRET production
vercel env add NEXTAUTH_URL production
vercel env add GOOGLE_CLIENT_ID production
vercel env add GOOGLE_CLIENT_SECRET production

# Cloudinary
vercel env add CLOUDINARY_CLOUD_NAME production
vercel env add CLOUDINARY_API_KEY production
vercel env add CLOUDINARY_API_SECRET production
vercel env add NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET production

# Stripe
vercel env add STRIPE_SECRET_KEY production
vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY production
vercel env add STRIPE_WEBHOOK_SECRET production

# Email
vercel env add RESEND_API_KEY production
vercel env add FROM_EMAIL production

echo "✅ Environment variables configured"
```

## 🗄️ Database Deployment

### 1. Create Vercel Postgres Database

```bash
# In Vercel Dashboard
1. Go to Storage tab
2. Click "Create Database"
3. Select "Postgres"
4. Choose region (same as deployment region)
5. Name: "pulse-architects-prod"
6. Copy connection strings
```

### 2. Run Migrations

```bash
# Set environment variables locally
export DATABASE_URL="your-vercel-postgres-url"
export DIRECT_URL="your-vercel-postgres-direct-url"

# Generate Prisma client
npx prisma generate

# Deploy migrations
npx prisma migrate deploy

# Seed database (optional)
npx prisma db seed
```

### 3. Verify Database Setup

```bash
# Connect to database
npx prisma studio

# Or check via CLI
npx prisma db pull
```

## 📦 Application Deployment

### 1. Prepare for Deployment

```bash
# Ensure all dependencies are installed
npm install

# Run type checking
npm run type-check

# Run linting
npm run lint

# Run tests
npm test

# Build locally to test
npm run build
```

### 2. Deploy to Vercel

```bash
# Deploy to production
vercel --prod

# Or use GitHub integration for automatic deploys
git push origin main
```

### 3. Post-Deployment Setup

```bash
# Verify deployment
curl -I https://your-domain.vercel.app

# Check database connection
curl https://your-domain.vercel.app/api/health

# Test authentication
# Navigate to /auth/signin and test login
```

## 🔧 Configuration Files

### 1. Vercel Configuration (`vercel.json`)

The project includes optimized Vercel configuration:

```json
{
  "functions": {
    "app/api/**/*.ts": {
      "maxDuration": 30
    }
  },
  "build": {
    "env": {
      "ENABLE_EXPERIMENTAL_COREPACK": "1"
    }
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        }
      ]
    }
  ]
}
```

### 2. Build Configuration (`package.json`)

```json
{
  "scripts": {
    "vercel-build": "prisma generate && prisma migrate deploy && next build",
    "postinstall": "prisma generate"
  }
}
```

## 🔍 Testing Deployment

### 1. Pre-Production Testing

```bash
# Create staging environment
vercel env add DATABASE_URL staging
vercel env add DIRECT_URL staging
# ... add all other env vars for staging

# Deploy to staging
vercel --target staging

# Test staging deployment
curl https://your-project-staging.vercel.app/api/health
```

### 2. Production Verification

After production deployment, verify:

- [ ] Homepage loads correctly
- [ ] User authentication works
- [ ] Plan browsing and search function
- [ ] File downloads work (test with sample plan)
- [ ] Payment processing (use Stripe test mode)
- [ ] Admin dashboard access
- [ ] Email notifications send correctly

### 3. Database Health Check

```typescript
// Visit /api/health in browser or:
curl https://your-domain.vercel.app/api/health

// Expected response:
{
  "status": "healthy",
  "database": "connected",
  "timestamp": "2024-01-20T10:30:00.000Z"
}
```

## 🔄 Ongoing Maintenance

### 1. Database Migrations

For schema updates:

```bash
# Create migration locally
npx prisma migrate dev --name add_new_feature

# Test migration
npm run db:migrate:reset
npm run db:seed

# Deploy to staging
vercel env pull .env.staging
npx prisma migrate deploy

# Deploy to production
vercel env pull .env.production
npx prisma migrate deploy
```

### 2. Monitoring Setup

```bash
# Set up Vercel Analytics
1. Enable in Vercel Dashboard → Analytics
2. Add to environment: VERCEL_ANALYTICS="true"

# Set up error monitoring
1. Configure Sentry or similar service
2. Add DSN to environment variables
```

### 3. Backup Strategy

```bash
# Automated backups via Vercel Postgres
1. Enable in Vercel Dashboard → Storage → Backup
2. Configure retention period
3. Set up backup notifications

# Manual backup
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d).sql
```

## 🚨 Troubleshooting

### Common Issues

#### 1. Database Connection Errors
```bash
# Check connection strings
echo $DATABASE_URL
echo $DIRECT_URL

# Verify with Prisma
npx prisma db pull
```

#### 2. Migration Failures
```bash
# Reset migrations (destructive)
npx prisma migrate reset

# Or fix migration manually
npx prisma db push
```

#### 3. Build Failures
```bash
# Clear cache
vercel --prod --force

# Check build logs in Vercel Dashboard
```

#### 4. Environment Variable Issues
```bash
# List all env vars
vercel env ls

# Pull current env vars
vercel env pull .env.local
```

### Performance Issues

#### 1. Slow Database Queries
```sql
-- Check slow queries
SELECT query, mean_exec_time, calls 
FROM pg_stat_statements 
ORDER BY mean_exec_time DESC;

-- Add missing indexes
CREATE INDEX CONCURRENTLY idx_plans_category ON plans(category_id);
```

#### 2. High Memory Usage
```bash
# Optimize Prisma client
npx prisma generate --optimize

# Review connection pooling settings
```

## 📊 Monitoring & Analytics

### 1. Vercel Analytics
- Enable in project dashboard
- Monitor Core Web Vitals
- Track user interactions

### 2. Database Monitoring
- Monitor connection counts
- Track query performance
- Set up alerts for high usage

### 3. Error Tracking
```typescript
// Add to pages/_app.tsx
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.VERCEL_ENV
})
```

## 🔐 Security Considerations

### 1. Database Security
- Use connection pooling (pgbouncer=true)
- Enable SSL (sslmode=require)
- Rotate credentials regularly
- Monitor access logs

### 2. Application Security
- Keep dependencies updated
- Enable CSRF protection
- Use Content Security Policy
- Monitor for vulnerabilities

### 3. File Upload Security
- Validate file types and sizes
- Use signed URLs for downloads
- Monitor download patterns
- Implement rate limiting

## 📝 Deployment Checklist

### Pre-Launch
- [ ] All environment variables configured
- [ ] Database migrations applied
- [ ] Sample data seeded (if needed)
- [ ] SSL certificate configured
- [ ] Custom domain connected (if applicable)
- [ ] Email templates tested
- [ ] Payment processing tested
- [ ] File upload/download tested
- [ ] Admin access verified
- [ ] Backup strategy implemented
- [ ] Monitoring tools configured

### Post-Launch
- [ ] Performance monitoring active
- [ ] Error tracking configured
- [ ] Analytics tracking verified
- [ ] SEO optimization completed
- [ ] Documentation updated
- [ ] Team access configured
- [ ] Support processes established

---

**Need Help?**
- Vercel Documentation: [vercel.com/docs](https://vercel.com/docs)
- Prisma Documentation: [prisma.io/docs](https://prisma.io/docs)
- Project Issues: Create an issue in the repository