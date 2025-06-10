
    import { cn } from '@/lib/utils';
    import { Slot } from '@radix-ui/react-slot';
    import { cva } from 'class-variance-authority';
    import React from 'react';
    import { motion } from 'framer-motion';

    const buttonVariants = cva(
      'inline-flex items-center justify-center rounded-lg text-sm font-medium ring-offset-background transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transform',
      {
        variants: {
          variant: {
            default: 'bg-primary text-primary-foreground btn-primary-hover',
            destructive:
              'bg-destructive text-destructive-foreground hover:bg-destructive/90',
            outline:
              'border border-primary text-primary bg-transparent btn-outline-hover',
            secondary:
              'bg-secondary text-secondary-foreground hover:bg-secondary/80',
            ghost: 'hover:bg-accent hover:text-accent-foreground',
            link: 'text-primary underline-offset-4 hover:underline',
          },
          size: {
            default: 'h-11 px-6 py-2.5',
            sm: 'h-10 rounded-md px-4',
            lg: 'h-12 rounded-lg px-8 text-base',
            icon: 'h-10 w-10',
          },
        },
        defaultVariants: {
          variant: 'default',
          size: 'default',
        },
      },
    );

    const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
      const Comp = asChild ? Slot : motion.button;
      return (
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
          whileTap={{ scale: 0.98 }}
          {...props}
        />
      );
    });
    Button.displayName = 'Button';

    export { Button, buttonVariants };
  