'use client';

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils/cn';
import { Button } from '@/components/ui/Button';
import { 
  ChevronDownIcon, 
  ChevronRightIcon,
  HomeIcon,
  BuildingIcon,
  Building2Icon,
  CastleIcon,
  TreesIcon,
  WavesIcon,
  MountainIcon,
  MapPinIcon,
} from 'lucide-react';

export interface CategoryItem {
  id: string;
  name: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  count?: number;
  image?: string;
  subcategories?: CategoryItem[];
  featured?: boolean;
  new?: boolean;
}

export interface CategoryNavigationProps {
  categories: CategoryItem[];
  onCategorySelect?: (category: CategoryItem) => void;
  className?: string;
  variant?: 'horizontal' | 'vertical' | 'mega-menu';
  showIcons?: boolean;
  showCounts?: boolean;
  maxDepth?: number;
}

const CategoryNavigation: React.FC<CategoryNavigationProps> = ({
  categories,
  onCategorySelect,
  className,
  variant = 'horizontal',
  showIcons = true,
  showCounts = true,
  maxDepth = 3,
}) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const timeoutRef = useRef<NodeJS.Timeout>();

  // Handle mouse enter/leave for hover states
  const handleMouseEnter = (categoryId: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setHoveredCategory(categoryId);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setHoveredCategory(null);
    }, 150);
  };

  // Handle category expansion for mobile/vertical layout
  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  // Handle category selection
  const handleCategorySelect = (category: CategoryItem) => {
    setActiveCategory(category.id);
    onCategorySelect?.(category);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Render category item
  const renderCategoryItem = (category: CategoryItem, depth = 0, isSubcategory = false) => {
    const Icon = category.icon;
    const hasSubcategories = category.subcategories && category.subcategories.length > 0;
    const isExpanded = expandedCategories.has(category.id);
    const isHovered = hoveredCategory === category.id;
    const isActive = activeCategory === category.id;

    if (variant === 'mega-menu' && !isSubcategory) {
      return (
        <div
          key={category.id}
          className="relative"
          onMouseEnter={() => handleMouseEnter(category.id)}
          onMouseLeave={handleMouseLeave}
        >
          <button
            onClick={() => handleCategorySelect(category)}
            className={cn(
              'flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-colors',
              'hover:text-primary-600 hover:bg-primary-50',
              'dark:hover:text-primary-400 dark:hover:bg-primary-900/20',
              isActive && 'text-primary-600 bg-primary-50 dark:text-primary-400 dark:bg-primary-900/20',
              'relative'
            )}
          >
            {showIcons && Icon && <Icon className="h-5 w-5" />}
            <span>{category.name}</span>
            {showCounts && category.count && (
              <span className="text-xs text-neutral-400">({category.count})</span>
            )}
            {category.new && (
              <span className="bg-success-100 text-success-700 text-xs px-2 py-0.5 rounded-full">
                New
              </span>
            )}
            {hasSubcategories && (
              <ChevronDownIcon className="h-4 w-4 ml-auto" />
            )}
          </button>

          {/* Mega Menu Dropdown */}
          {hasSubcategories && isHovered && (
            <div className="absolute top-full left-0 w-screen max-w-4xl bg-white shadow-xl border border-neutral-200 rounded-lg z-50 dark:bg-neutral-900 dark:border-neutral-800">
              <div className="p-6">
                <div className="grid grid-cols-4 gap-6">
                  {/* Featured Category */}
                  {category.featured && (
                    <div className="col-span-1 space-y-4">
                      <h3 className="font-semibold text-neutral-900 dark:text-white">
                        Featured in {category.name}
                      </h3>
                      {category.image && (
                        <div className="aspect-square rounded-lg overflow-hidden">
                          <img
                            src={category.image}
                            alt={category.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <p className="text-sm text-neutral-500">
                        {category.description}
                      </p>
                    </div>
                  )}

                  {/* Subcategories */}
                  <div className={cn(
                    'grid gap-4',
                    category.featured ? 'col-span-3 grid-cols-3' : 'col-span-4 grid-cols-4'
                  )}>
                    {category.subcategories?.map((subcategory) => (
                      <div key={subcategory.id} className="space-y-2">
                        <button
                          onClick={() => handleCategorySelect(subcategory)}
                          className="flex items-center space-x-2 text-sm font-medium text-neutral-900 hover:text-primary-600 dark:text-white dark:hover:text-primary-400"
                        >
                          {showIcons && subcategory.icon && (
                            <subcategory.icon className="h-4 w-4" />
                          )}
                          <span>{subcategory.name}</span>
                        </button>
                        
                        {subcategory.subcategories && (
                          <div className="space-y-1 pl-6">
                            {subcategory.subcategories.slice(0, 5).map((item) => (
                              <button
                                key={item.id}
                                onClick={() => handleCategorySelect(item)}
                                className="block text-sm text-neutral-500 hover:text-primary-600 dark:text-neutral-400 dark:hover:text-primary-400"
                              >
                                {item.name}
                                {showCounts && item.count && (
                                  <span className="ml-1">({item.count})</span>
                                )}
                              </button>
                            ))}
                            {subcategory.subcategories.length > 5 && (
                              <button
                                onClick={() => handleCategorySelect(subcategory)}
                                className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400"
                              >
                                View all {subcategory.subcategories.length} options →
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }

    if (variant === 'vertical') {
      return (
        <div key={category.id} className={cn('space-y-1', depth > 0 && 'ml-4')}>
          <button
            onClick={() => {
              if (hasSubcategories) {
                toggleCategory(category.id);
              } else {
                handleCategorySelect(category);
              }
            }}
            className={cn(
              'flex items-center justify-between w-full px-3 py-2 text-sm text-left rounded-lg transition-colors',
              'hover:bg-neutral-100 hover:text-neutral-900',
              'dark:hover:bg-neutral-800 dark:hover:text-neutral-100',
              isActive && 'bg-primary-100 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400',
              depth > 0 && 'text-neutral-600 dark:text-neutral-400'
            )}
          >
            <div className="flex items-center space-x-2 min-w-0 flex-1">
              {showIcons && Icon && <Icon className="h-4 w-4 flex-shrink-0" />}
              <span className="truncate">{category.name}</span>
              {category.new && (
                <span className="bg-success-100 text-success-700 text-xs px-1.5 py-0.5 rounded">
                  New
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-1 flex-shrink-0">
              {showCounts && category.count && (
                <span className="text-xs text-neutral-400">
                  {category.count}
                </span>
              )}
              {hasSubcategories && (
                <ChevronRightIcon 
                  className={cn(
                    'h-4 w-4 transition-transform',
                    isExpanded && 'rotate-90'
                  )} 
                />
              )}
            </div>
          </button>

          {/* Subcategories */}
          {hasSubcategories && isExpanded && depth < maxDepth && (
            <div className="space-y-1">
              {category.subcategories?.map((subcategory) =>
                renderCategoryItem(subcategory, depth + 1, true)
              )}
            </div>
          )}
        </div>
      );
    }

    // Horizontal variant (default)
    return (
      <div
        key={category.id}
        className="relative"
        onMouseEnter={() => handleMouseEnter(category.id)}
        onMouseLeave={handleMouseLeave}
      >
        <button
          onClick={() => handleCategorySelect(category)}
          className={cn(
            'flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors',
            'hover:bg-neutral-100 hover:text-neutral-900',
            'dark:hover:bg-neutral-800 dark:hover:text-neutral-100',
            isActive && 'bg-primary-100 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400'
          )}
        >
          {showIcons && Icon && <Icon className="h-4 w-4" />}
          <span>{category.name}</span>
          {showCounts && category.count && (
            <span className="text-xs text-neutral-400">({category.count})</span>
          )}
          {hasSubcategories && (
            <ChevronDownIcon className="h-4 w-4" />
          )}
        </button>

        {/* Dropdown */}
        {hasSubcategories && isHovered && (
          <div className="absolute top-full left-0 min-w-48 bg-white shadow-lg border border-neutral-200 rounded-lg z-40 dark:bg-neutral-900 dark:border-neutral-800">
            <div className="py-2">
              {category.subcategories?.map((subcategory) => (
                <button
                  key={subcategory.id}
                  onClick={() => handleCategorySelect(subcategory)}
                  className="flex items-center justify-between w-full px-4 py-2 text-sm text-left hover:bg-neutral-50 dark:hover:bg-neutral-800"
                >
                  <div className="flex items-center space-x-2">
                    {showIcons && subcategory.icon && (
                      <subcategory.icon className="h-4 w-4" />
                    )}
                    <span>{subcategory.name}</span>
                  </div>
                  {showCounts && subcategory.count && (
                    <span className="text-xs text-neutral-400">
                      {subcategory.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <nav className={cn(
      'category-navigation',
      variant === 'horizontal' && 'flex items-center space-x-1',
      variant === 'vertical' && 'space-y-1',
      variant === 'mega-menu' && 'flex items-center space-x-1',
      className
    )}>
      {categories.map((category) => renderCategoryItem(category))}
    </nav>
  );
};

// Predefined category icons for architectural plans
export const architecturalIcons = {
  residential: HomeIcon,
  commercial: BuildingIcon,
  industrial: Building2Icon,
  luxury: CastleIcon,
  cabin: TreesIcon,
  coastal: WavesIcon,
  mountain: MountainIcon,
  urban: MapPinIcon,
};

export { CategoryNavigation };