'use client';

import React from 'react';
import { cn } from '@/lib/utils/cn';
import { ChevronRightIcon, HomeIcon } from 'lucide-react';

export interface BreadcrumbItem {
  id: string;
  label: string;
  href?: string;
  icon?: React.ComponentType<{ className?: string }>;
  isActive?: boolean;
  onClick?: () => void;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  maxItems?: number;
  showHome?: boolean;
  separator?: React.ReactNode;
  className?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  maxItems = 5,
  showHome = true,
  separator,
  className,
}) => {
  // Add home item if requested and not already present
  const allItems = React.useMemo(() => {
    const hasHome = items.some(item => item.id === 'home');
    if (showHome && !hasHome) {
      return [
        {
          id: 'home',
          label: 'Home',
          href: '/',
          icon: HomeIcon,
        },
        ...items,
      ];
    }
    return items;
  }, [items, showHome]);

  // Handle item truncation if there are too many items
  const displayItems = React.useMemo(() => {
    if (allItems.length <= maxItems) {
      return allItems;
    }

    // Always show first item (home), last few items, with ellipsis in between
    const firstItem = allItems[0];
    const lastItems = allItems.slice(-(maxItems - 2)); // Reserve space for first item and ellipsis
    
    return [
      firstItem,
      {
        id: 'ellipsis',
        label: '...',
        isActive: false,
      } as BreadcrumbItem,
      ...lastItems,
    ];
  }, [allItems, maxItems]);

  const defaultSeparator = separator || <ChevronRightIcon className="h-4 w-4 text-neutral-400" />;

  const handleItemClick = (item: BreadcrumbItem) => {
    if (item.onClick) {
      item.onClick();
    } else if (item.href && typeof window !== 'undefined') {
      window.location.href = item.href;
    }
  };

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn('flex items-center space-x-1', className)}
    >
      <ol className="flex items-center space-x-1">
        {displayItems.map((item, index) => {
          const isLast = index === displayItems.length - 1;
          const Icon = item.icon;
          const isEllipsis = item.id === 'ellipsis';
          const isClickable = !isEllipsis && !(item as BreadcrumbItem).isActive && (item.href || (item as BreadcrumbItem).onClick);

          return (
            <li key={item.id} className="flex items-center">
              {/* Breadcrumb Item */}
              <div className="flex items-center">
                {isClickable ? (
                  <button
                    onClick={() => handleItemClick(item)}
                    className={cn(
                      'flex items-center space-x-1 text-sm font-medium transition-colors',
                      'hover:text-primary-600 dark:hover:text-primary-400',
                      'text-neutral-500 dark:text-neutral-400',
                      'focus:outline-none focus:text-primary-600 dark:focus:text-primary-400'
                    )}
                  >
                    {Icon && <Icon className="h-4 w-4" />}
                    <span>{item.label}</span>
                  </button>
                ) : (
                  <span
                    className={cn(
                      'flex items-center space-x-1 text-sm font-medium',
                      isEllipsis 
                        ? 'text-neutral-400 dark:text-neutral-600'
                        : (item as BreadcrumbItem).isActive || isLast
                        ? 'text-neutral-900 dark:text-neutral-100'
                        : 'text-neutral-500 dark:text-neutral-400'
                    )}
                  >
                    {Icon && <Icon className="h-4 w-4" />}
                    <span>{item.label}</span>
                  </span>
                )}
              </div>

              {/* Separator */}
              {!isLast && (
                <div className="mx-2 flex items-center">
                  {defaultSeparator}
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

// Specialized breadcrumb for architectural plan navigation
export interface ArchitecturalBreadcrumbProps {
  category?: string;
  subcategory?: string;
  planTitle?: string;
  onNavigate?: (path: string) => void;
  className?: string;
}

const ArchitecturalBreadcrumb: React.FC<ArchitecturalBreadcrumbProps> = ({
  category,
  subcategory,
  planTitle,
  onNavigate,
  className,
}) => {
  const items: BreadcrumbItem[] = React.useMemo(() => {
    const breadcrumbItems: BreadcrumbItem[] = [];

    // Add catalog root
    breadcrumbItems.push({
      id: 'catalog',
      label: 'Plans',
      href: '/catalog',
      onClick: () => onNavigate?.('/catalog'),
    });

    // Add category if present
    if (category) {
      breadcrumbItems.push({
        id: 'category',
        label: category,
        href: `/catalog/${encodeURIComponent(category.toLowerCase())}`,
        onClick: () => onNavigate?.(`/catalog/${encodeURIComponent(category.toLowerCase())}`),
      });
    }

    // Add subcategory if present
    if (subcategory) {
      breadcrumbItems.push({
        id: 'subcategory',
        label: subcategory,
        href: `/catalog/${encodeURIComponent(category?.toLowerCase() || '')}/${encodeURIComponent(subcategory.toLowerCase())}`,
        onClick: () => onNavigate?.(`/catalog/${encodeURIComponent(category?.toLowerCase() || '')}/${encodeURIComponent(subcategory.toLowerCase())}`),
      });
    }

    // Add plan title if present (this is the current page, so no link)
    if (planTitle) {
      breadcrumbItems.push({
        id: 'plan',
        label: planTitle,
        isActive: true,
      });
    }

    return breadcrumbItems;
  }, [category, subcategory, planTitle, onNavigate]);

  return (
    <Breadcrumb
      items={items}
      className={className}
      showHome={true}
    />
  );
};

// Compact breadcrumb component for mobile/small spaces
export interface CompactBreadcrumbProps {
  currentLabel: string;
  parentLabel?: string;
  onBack?: () => void;
  className?: string;
}

const CompactBreadcrumb: React.FC<CompactBreadcrumbProps> = ({
  currentLabel,
  parentLabel,
  onBack,
  className,
}) => {
  return (
    <nav className={cn('flex items-center space-x-2', className)}>
      {parentLabel && onBack && (
        <>
          <button
            onClick={onBack}
            className="flex items-center text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
          >
            <ChevronRightIcon className="h-4 w-4 rotate-180 mr-1" />
            {parentLabel}
          </button>
          <ChevronRightIcon className="h-4 w-4 text-neutral-400" />
        </>
      )}
      <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate">
        {currentLabel}
      </span>
    </nav>
  );
};

export { Breadcrumb, ArchitecturalBreadcrumb, CompactBreadcrumb };