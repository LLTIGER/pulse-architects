# Complete Authentication & Content Management System

## Task Overview
Fix AuthProvider originalFactory error and implement complete authentication system with admin content management, image upload, gallery, and publish/download workflow.

## Analysis Process

### Scope Definition
- **Files Affected**: 
  - `lib/auth/auth-context.tsx` (AuthProvider fix) ✅ COMPLETED
  - `app/layout.tsx` (import/export fix) ✅ COMPLETED
  - **NEW: Internationalization System**
    - `app/[locale]/` (locale-based routing structure)
    - `lib/i18n/` (i18n configuration and utilities)
    - `messages/` (translation files: en.json, fr.json)
    - `middleware.ts` (locale detection and routing)
    - `components/LocaleSwitcher.tsx` (language selector)
  - `app/(auth)/` (login/register pages - now multilingual)
  - `app/dashboard/` (admin dashboard - multilingual)
  - `app/api/auth/` (authentication endpoints)
  - `components/admin/` (admin components - multilingual)
  - `prisma/schema.prisma` (database schema with locale support)
  - Image upload/gallery system (with multilingual metadata)
  - Content publishing workflow (locale-aware)

### Dependencies
- **Internationalization**: next-intl (recommended for Next.js 15 App Router)
- **Alternative**: react-i18next with next-i18next
- Prisma ORM for database (with locale support)
- NextAuth.js or custom JWT authentication
- Cloudinary for image storage
- File upload handling
- Role-based access control (RBAC)

## Context

```yaml
context:
  docs:
    - url: "https://nextjs.org/docs/app/building-your-application/authentication"
      focus: ["Next.js 15 App Router authentication"]
    - url: "https://next-auth.js.org/getting-started/introduction"
      focus: ["Provider setup", "Session management"]

  patterns:
    - file: "lib/auth/auth-context.tsx"
      copy: ["Named export pattern", "Client component structure"]
    - file: "app/layout.tsx"
      copy: ["Dynamic import for client components"]

  gotchas:
    - issue: "AuthProvider undefined at runtime"
      fix: "Check import/export syntax match"
    - issue: "Client components in server layout"
      fix: "Use dynamic imports with loading states"
    - issue: "Prisma client-side execution"
      fix: "Move database calls to API routes"
```

## Task Sequencing

### 0. Internationalization Foundation (PRIORITY)

```
INSTALL next-intl:
  - OPERATION: npm install next-intl
  - VALIDATE: Package installed successfully
  - IF_FAIL: Try alternative i18n library
  - ROLLBACK: Remove package if conflicts arise

RESTRUCTURE app/[locale] routing:
  - OPERATION: Move existing pages into [locale] dynamic segment
  - VALIDATE: All routes accessible at /en/ and /fr/
  - IF_FAIL: Check middleware routing configuration
  - ROLLBACK: Revert to flat app structure temporarily

CREATE middleware.ts:
  - OPERATION: Implement locale detection and routing
  - VALIDATE: Auto-redirects to appropriate language
  - IF_FAIL: Check locale detection logic
  - ROLLBACK: Disable middleware temporarily

SETUP translation files:
  - OPERATION: Create messages/en.json and messages/fr.json
  - VALIDATE: Translations load correctly in components
  - IF_FAIL: Check file paths and JSON syntax
  - ROLLBACK: Use fallback English text

IMPLEMENT useTranslations hook:
  - OPERATION: Replace hardcoded text with translation keys
  - VALIDATE: Text switches between English/French
  - IF_FAIL: Check hook implementation and key names
  - ROLLBACK: Revert to hardcoded English text
```

### 1. Setup Tasks (Prerequisites)

```
ANALYZE lib/auth/auth-context.tsx:
  - OPERATION: Check export syntax (default vs named)
  - VALIDATE: console.log AuthProvider in layout.tsx
  - IF_FAIL: Fix import/export mismatch
  - ROLLBACK: Revert to commented out state

ANALYZE app/layout.tsx:
  - OPERATION: Verify import syntax matches export
  - VALIDATE: Dynamic import loads without originalFactory error
  - IF_FAIL: Switch to proper dynamic import pattern
  - ROLLBACK: Use static import temporarily
```

### 2. Core Authentication Fix

```
FIX lib/auth/auth-context.tsx:
  - OPERATION: Ensure proper default export and client component
  - VALIDATE: Component renders with children prop
  - IF_FAIL: Debug export statement and React component structure
  - ROLLBACK: Implement minimal auth context

IMPLEMENT app/layout.tsx:
  - OPERATION: Use correct dynamic import pattern
  - VALIDATE: No originalFactory errors in console
  - IF_FAIL: Try alternative loading approaches
  - ROLLBACK: Comment out AuthProvider temporarily
```

### 3. Authentication System Implementation

```
CREATE app/(auth)/login/page.tsx:
  - OPERATION: Build login form with email/password
  - VALIDATE: Form submits to API and sets auth token
  - IF_FAIL: Check API route and form handling
  - ROLLBACK: Static login page without functionality

CREATE app/(auth)/register/page.tsx:
  - OPERATION: Build registration form
  - VALIDATE: Creates new user account
  - IF_FAIL: Debug database connection and validation
  - ROLLBACK: Disable registration temporarily

IMPLEMENT app/api/auth/login/route.ts:
  - OPERATION: JWT authentication endpoint
  - VALIDATE: Returns valid token for correct credentials
  - IF_FAIL: Check password hashing and JWT signing
  - ROLLBACK: Return mock success response
```

### 4. Admin Dashboard System

```
CREATE app/dashboard/page.tsx:
  - OPERATION: Protected admin dashboard with role check
  - VALIDATE: Only admins can access, redirects others
  - IF_FAIL: Check authentication middleware
  - ROLLBACK: Public dashboard temporarily

IMPLEMENT components/admin/ImageUpload.tsx:
  - OPERATION: Drag & drop image upload with Cloudinary
  - VALIDATE: Images upload successfully and return URLs
  - IF_FAIL: Check Cloudinary configuration
  - ROLLBACK: Basic file input upload

CREATE app/api/admin/images/route.ts:
  - OPERATION: Handle image upload and database storage
  - VALIDATE: Images saved to database with metadata
  - IF_FAIL: Debug file handling and storage
  - ROLLBACK: Log upload attempts only
```

### 5. Gallery & Publishing System

```
IMPLEMENT app/gallery/page.tsx:
  - OPERATION: Display approved images in gallery
  - VALIDATE: Images load with proper optimization
  - IF_FAIL: Check image URLs and optimization settings
  - ROLLBACK: Basic image list without optimization

CREATE components/admin/ContentManager.tsx:
  - OPERATION: Admin interface to approve/publish content
  - VALIDATE: Status changes reflect in public gallery
  - IF_FAIL: Check database updates and permissions
  - ROLLBACK: Read-only content list

IMPLEMENT app/api/download/[id]/route.ts:
  - OPERATION: Secure download endpoint with tracking
  - VALIDATE: Files download correctly, metrics recorded
  - IF_FAIL: Check file paths and streaming
  - ROLLBACK: Direct file links without tracking
```

### 6. Database Schema Updates

```
UPDATE prisma/schema.prisma:
  - OPERATION: Add User, Image, Download models with relationships
  - VALIDATE: Migration runs successfully
  - IF_FAIL: Fix schema conflicts and constraints
  - ROLLBACK: Previous working schema

SEED prisma/seed.ts:
  - OPERATION: Create admin user and sample content
  - VALIDATE: Database populated with test data
  - IF_FAIL: Check seed script and data validity
  - ROLLBACK: Empty database with schema only
```

## Validation Strategy

### Unit Tests
- AuthProvider renders correctly
- Login/register forms handle validation
- API routes return expected responses
- Image upload processes files correctly

### Integration Tests
- Complete login flow works end-to-end
- Admin can upload and publish images
- Public gallery displays published content
- Download tracking works correctly

### Performance Checks
- Image optimization reduces file sizes
- Gallery loads quickly with pagination
- Database queries are optimized
- Authentication doesn't block page loads

### Security Validation
- SQL injection prevention
- File upload security (type/size limits)
- Authentication token validation
- Role-based access enforcement

## User Interaction Points

### 1. Task Review
**Confirm scope**: Does this cover all the authentication and CMS requirements?
**Validate sequencing**: Should we prioritize auth fix first, then build features?
**Check completeness**: Are there any missing components for the workflow?

### 2. Risk Assessment
**Potential impacts**: Database changes, authentication changes affect all users
**Rollback approach**: Each task has individual rollback, can revert to current working state
**Success criteria**: Users can login, admins can manage content, content publishes to live site

## Critical Elements

### Debug Patterns
```javascript
// AuthProvider debug
console.log("AuthProvider type:", typeof AuthProvider);
console.log("AuthProvider:", AuthProvider);

// Authentication debug
console.log("Auth token:", localStorage.getItem('auth_token'));
console.log("User state:", user);

// Image upload debug
console.log("File upload result:", uploadResult);
console.log("Cloudinary response:", cloudinaryData);
```

### Performance Considerations
- Image optimization with Next.js Image component
- Lazy loading for gallery
- Database indexing for queries
- Caching for authentication checks

### Security Concerns
- JWT token expiration and refresh
- File upload type validation
- SQL injection prevention
- XSS protection for user content
- Rate limiting for API endpoints

## Implementation Priority

### Phase 1: Critical Fix (Immediate)
1. Fix AuthProvider originalFactory error
2. Get authentication working
3. Basic login/logout functionality

### Phase 2: Admin Features (Week 1)
1. Admin dashboard
2. Image upload system
3. Content management interface

### Phase 3: Publishing System (Week 2)
1. Gallery implementation
2. Download system
3. Publishing workflow
4. Content approval process

### Phase 4: Polish & Security (Week 3)
1. Security hardening
2. Performance optimization
3. Error handling
4. User experience improvements

## Quality Checklist

- [x] All changes identified
- [x] Dependencies mapped (Prisma, Cloudinary, NextAuth)
- [x] Each task has validation steps
- [x] Rollback steps included for each change
- [x] Debug strategies provided
- [x] Performance impact noted
- [x] Security concerns documented
- [x] Implementation phases defined

## Expected Outcome

After implementation:
- ✅ AuthProvider works without originalFactory errors
- ✅ Users can register/login to the system
- ✅ Admins have access to dashboard and content management
- ✅ Images can be uploaded and managed through admin interface
- ✅ Gallery displays approved content to public users
- ✅ Download system tracks usage and provides secure file access
- ✅ Complete publish workflow from upload → approval → live site

## Next Steps

1. **Immediate**: Fix AuthProvider import/export issue
2. **Short-term**: Implement basic authentication flow
3. **Medium-term**: Build admin content management system
4. **Long-term**: Complete publishing and download workflow

This PRP provides a structured approach to implementing the complete authentication and content management system you described, starting with fixing the immediate AuthProvider error and building up to a full-featured CMS.