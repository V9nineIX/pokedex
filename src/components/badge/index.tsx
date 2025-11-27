import React from 'react';
import { TYPE_COLORS } from '../../constant';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'type';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  type?: string; // For Pokemon type-specific colors
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  type
}) => {
  // Base styles
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-full transition-all duration-200';

  // Size variants
  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5'
  };

  // Color variants
  const variantStyles = {
    default: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-purple-500 text-white hover:bg-purple-600',
    success: 'bg-green-500 text-white hover:bg-green-600',
    warning: 'bg-yellow-500 text-gray-900 hover:bg-yellow-600',
    danger: 'bg-red-500 text-white hover:bg-red-600',
    type: ''
  };

  // Get Pokemon type colors from constants
  const getTypeColor = (): string => {
    if (variant === 'type' && type) {
      const typeKey = type.toLowerCase();
      const bgColor = TYPE_COLORS[typeKey as keyof typeof TYPE_COLORS] || 'bg-gray-200';
      return `${bgColor} text-white`;
    }
    return '';
  };

  const typeColorClass = variant === 'type' ? getTypeColor() : variantStyles[variant];
  const classes = `${baseStyles} ${sizeStyles[size]} ${typeColorClass} ${className}`;

  return (
    <span className={classes}>
      {children}
    </span>
  );
};

export default Badge;

