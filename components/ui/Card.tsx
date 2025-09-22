'use client';

import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils/cn';

const cardVariants = cva(
  [
    // Base styles
    'rounded-2xl transition-all duration-300',
    'border border-neutral-200/60',
    'dark:border-neutral-800/60',
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-white shadow-sm',
          'dark:bg-neutral-900',
        ],
        elevated: [
          'bg-white shadow-elevation-medium',
          'hover:shadow-elevation-high',
          'dark:bg-neutral-900',
        ],
        glass: [
          'bg-white/10 backdrop-blur-xl border-white/20',
          'shadow-glass',
          'dark:bg-black/10 dark:border-black/20',
        ],
        premium: [
          'bg-gradient-to-br from-white via-white to-neutral-50',
          'shadow-elevation-high border-neutral-100',
          'dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800',
          'dark:border-neutral-700',
        ],
        blueprint: [
          'bg-gradient-to-br from-blueprint-50 to-primary-50',
          'border-blueprint-200/50 shadow-blueprint',
          'dark:from-blueprint-950 dark:to-primary-950',
          'dark:border-blueprint-800/50',
        ],
        interactive: [
          'bg-white shadow-sm cursor-pointer',
          'hover:shadow-elevation-medium hover:scale-[1.02]',
          'active:scale-[0.98] active:shadow-sm',
          'dark:bg-neutral-900',
        ],
        outline: [
          'bg-transparent border-2 border-neutral-200',
          'hover:border-neutral-300 hover:bg-neutral-50/50',
          'dark:border-neutral-800 dark:hover:border-neutral-700',
          'dark:hover:bg-neutral-900/50',
        ],
      },
      size: {
        sm: 'p-4',
        default: 'p-6',
        lg: 'p-8',
        xl: 'p-10',
      },
      animation: {
        none: '',
        fade: 'animate-fade-in',
        fadeUp: 'animate-fade-in-up',
        scale: 'animate-scale-in',
        float: 'animate-float',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      animation: 'none',
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  asChild?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, size, animation, asChild = false, ...props }, ref) => {
    const Comp = asChild ? 'div' : 'div';
    
    return (
      <Comp
        ref={ref}
        className={cn(cardVariants({ variant, size, animation }), className)}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';

// Card Header Component
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, title, subtitle, action, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col space-y-1.5 pb-6',
          action && 'flex-row items-start justify-between space-y-0',
          className
        )}
        {...props}
      >
        <div className="space-y-1">
          {title && (
            <h3 className="text-xl font-semibold leading-none tracking-tight">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {subtitle}
            </p>
          )}
          {children}
        </div>
        {action && <div className="flex items-center space-x-2">{action}</div>}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

// Card Content Component
const CardContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('space-y-4', className)} {...props} />
  )
);

CardContent.displayName = 'CardContent';

// Card Footer Component
const CardFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex items-center justify-between pt-6 border-t border-neutral-200/60',
        'dark:border-neutral-800/60',
        className
      )}
      {...props}
    />
  )
);

CardFooter.displayName = 'CardFooter';

// Gallery Card - Specialized for architectural plans
export interface GalleryCardProps extends CardProps {
  image: {
    src: string;
    alt: string;
    aspectRatio?: 'blueprint' | 'plan' | 'elevation' | 'detail' | 'wide';
  };
  title: string;
  subtitle?: string;
  tags?: string[];
  price?: string;
  onImageClick?: () => void;
  onCardClick?: () => void;
  overlay?: React.ReactNode;
  badges?: Array<{
    text: string;
    variant?: 'primary' | 'secondary' | 'success' | 'warning';
  }>;
}

const GalleryCard = forwardRef<HTMLDivElement, GalleryCardProps>(
  ({ 
    className, 
    image, 
    title, 
    subtitle, 
    tags, 
    price, 
    onImageClick, 
    onCardClick,
    overlay,
    badges,
    variant = 'interactive',
    ...props 
  }, ref) => {
    const aspectRatioClasses = {
      blueprint: 'aspect-blueprint',
      plan: 'aspect-plan',
      elevation: 'aspect-elevation',
      detail: 'aspect-detail',
      wide: 'aspect-wide',
    };

    const badgeVariants = {
      primary: 'bg-primary-100 text-primary-700 border-primary-200',
      secondary: 'bg-neutral-100 text-neutral-700 border-neutral-200',
      success: 'bg-success-100 text-success-700 border-success-200',
      warning: 'bg-warning-100 text-warning-700 border-warning-200',
    };

    return (
      <Card
        ref={ref}
        variant={variant}
        className={cn('group overflow-hidden', className)}
        onClick={onCardClick}
        {...props}
      >
        {/* Image Container */}
        <div 
          className={cn(
            'relative overflow-hidden rounded-lg mb-4 bg-neutral-100',
            aspectRatioClasses[image.aspectRatio || 'plan'],
            onImageClick && 'cursor-pointer'
          )}
          onClick={onImageClick}
        >
          <img
            src={image.src}
            alt={image.alt}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Overlay */}
          {overlay && (
            <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="flex h-full items-center justify-center">
                {overlay}
              </div>
            </div>
          )}

          {/* Badges */}
          {badges && badges.length > 0 && (
            <div className="absolute top-3 left-3 flex flex-wrap gap-2">
              {badges.map((badge, index) => (
                <span
                  key={index}
                  className={cn(
                    'px-2 py-1 text-xs font-medium rounded-md border',
                    badgeVariants[badge.variant || 'secondary']
                  )}
                >
                  {badge.text}
                </span>
              ))}
            </div>
          )}

          {/* Price */}
          {price && (
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
              <span className="text-sm font-semibold text-neutral-900">{price}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {title}
          </h3>
          
          {subtitle && (
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {subtitle}
            </p>
          )}

          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs text-neutral-600 bg-neutral-100 rounded-md dark:text-neutral-400 dark:bg-neutral-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Card>
    );
  }
);

GalleryCard.displayName = 'GalleryCard';

export { Card, CardHeader, CardContent, CardFooter, GalleryCard, cardVariants };