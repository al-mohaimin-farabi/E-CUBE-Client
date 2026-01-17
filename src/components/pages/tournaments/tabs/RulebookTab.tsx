'use client';

import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import type { Tournament } from '@/redux/features/tournaments/tournamentSlice';

interface RulebookTabProps {
  tournament: Tournament;
}

export const RulebookTab = ({ tournament }: RulebookTabProps) => {
  // Correct PDF path from public/rulebook folder
  const pdfUrl = '/rulebook/EEE2415_Mid-Term_Assignment_Sec_4C_Autumn-2024.pdf';
  const fileName = 'Tournament_Rulebook.pdf';

  return (
    <div className="flex w-full flex-col items-center justify-center py-10">
      <div className="w-full max-w-md space-y-6">
        <h3 className="type-sm text-muted-foreground font-medium">Rulebook</h3>

        {/* File Card */}
        <div className="border-border bg-card flex items-center justify-between rounded border p-4">
          <span className="type-sm text-muted-foreground font-medium">
            {fileName}
          </span>

          <a
            href={pdfUrl}
            download
            className="text-muted-foreground transition-colors hover:text-white"
          >
            <Download className="size-5" />
          </a>
        </div>

        <div className="relative text-center">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-white/10" />
          </div>
          <div className="relative flex justify-center">
            <span className="type-xs bg-[#0b0e12] px-2 text-white uppercase">
              Or
            </span>
          </div>
        </div>

        <Button
          className="type-base h-12 w-full bg-[#1895fc] font-bold text-white hover:bg-[#1895fc]/90"
          asChild
        >
          <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
            Read Rulebook Now
          </a>
        </Button>
      </div>
    </div>
  );
};
