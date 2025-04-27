type AvatarProps = {
  src: string;
  alt: string;
  status?: 'online' | 'away' | 'offline' | 'busy';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
};

const Avatar = ({ src, alt, status, size = 'md', className = '' }: AvatarProps) => {
  const sizeClasses = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
  };

  const statusClasses = {
    online: 'bg-success-500',
    away: 'bg-warning-500',
    offline: 'bg-neutral-400',
    busy: 'bg-error-500',
  };

  const statusSizeClasses = {
    xs: 'w-1.5 h-1.5',
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <img
        src={src}
        alt={alt}
        className={`${sizeClasses[size]} rounded-full object-cover border-2 border-white dark:border-neutral-800`}
      />
      {status && (
        <span 
          className={`absolute bottom-0 right-0 ${statusSizeClasses[size]} ${statusClasses[status]} rounded-full ring-2 ring-white dark:ring-neutral-800`}
        ></span>
      )}
    </div>
  );
};

export default Avatar;