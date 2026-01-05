'use client';

import { useRef, useState } from 'react';
import { CloudUpload, X } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ImageDropzoneProps {
  onFileSelect: (file: File, preview: string) => void;
  onClear?: () => void;
  preview?: string | null;
  error?: string | null;
  accept?: string;
  maxSizeMB?: number;
  requirements?: string[];
  className?: string;
  disabled?: boolean;
}

export const ImageDropzone = ({
  onFileSelect,
  onClear,
  preview,
  error,
  accept = 'image/png, image/svg+xml, image/webp',
  maxSizeMB = 5,
  requirements,
  className,
  disabled = false,
}: ImageDropzoneProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const validateAndProcess = (file: File) => {
    const validTypes = accept.split(',').map((t) => t.trim());

    if (!validTypes.includes(file.type)) {
      return;
    }

    if (file.size > maxSizeMB * 1024 * 1024) {
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      onFileSelect(file, reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) validateAndProcess(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled) return;

    const file = e.dataTransfer.files?.[0];
    if (file) validateAndProcess(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const triggerFileInput = () => {
    if (!disabled) fileInputRef.current?.click();
  };

  return (
    <div className={cn('space-y-4', className)}>
      <div className="mb-2 flex items-center justify-between">
        <label className="text-sm font-medium text-white">
          Team Logo<span className="ml-1 text-red-500">*</span>
        </label>
        <span className="text-sm font-medium text-white">Preview</span>
      </div>

      <div className="flex h-[180px] gap-4">
        {/* Upload Area */}
        <div
          onClick={triggerFileInput}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            'border-border group flex flex-1 cursor-pointer flex-col items-center justify-center rounded-[2px] border-2 border-dashed bg-white/5 transition-all',
            isDragging && 'border-primary bg-primary/10',
            error && 'border-red-500',
            disabled && 'cursor-not-allowed opacity-50',
            !disabled && 'hover:bg-white/10'
          )}
        >
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept={accept}
            onChange={handleFileChange}
            disabled={disabled}
          />
          <CloudUpload
            className={cn(
              'text-muted-foreground mb-3 h-8 w-8 transition-colors',
              isDragging && 'text-primary',
              !disabled && 'group-hover:text-primary'
            )}
          />
          <p className="text-muted-foreground text-sm font-medium">
            {isDragging ? 'Drop file here' : 'Click or Drop a file here'}
          </p>
          <p className="text-muted-foreground/60 text-xs">
            Supported: PNG, SVG, WebP
          </p>
        </div>

        {/* Preview Area */}
        <div className="border-border relative flex w-[180px] items-center justify-center overflow-hidden rounded-[2px] border-2 border-dashed bg-white/5">
          {preview ? (
            <>
              <Image
                src={preview}
                alt="Preview"
                fill
                className="object-contain p-2"
              />
              {onClear && !disabled && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onClear();
                  }}
                  className="absolute top-2 right-2 rounded-full bg-red-500/80 p-1 text-white transition-colors hover:bg-red-500"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </>
          ) : (
            <div className="text-muted-foreground/30 text-xs">No preview</div>
          )}
        </div>
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}

      {/* Requirements */}
      {requirements && requirements.length > 0 && (
        <div className="text-muted-foreground space-y-1 text-xs">
          <p className="font-medium text-white/80">Requirements:</p>
          <ul className="ml-1 list-inside list-disc space-y-0.5">
            {requirements.map((req, i) => (
              <li key={i}>{req}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
