import React from 'react';
import { TechnicalLabel } from '../common/TechnicalLabel';
import { MagniarButton } from '../common/MagniarButton';
import { AlertCircle, ArrowLeft, Briefcase } from 'lucide-react';

interface NotFoundPageProps {
  onReturnHome?: () => void;
  onViewWork?: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({
  onReturnHome,
  onViewWork,
}) => {
  return (
    <div className="bg-[#050505] text-[#F5F7FA] font-sans min-h-[75vh] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-12">
      <div className="max-w-lg w-full text-center space-y-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#B89A72]/10 border border-[#B89A72]/30 rounded-[2px]">
            <AlertCircle className="w-3.5 h-3.5 text-[#B89A72]" />
            <span className="font-mono text-xs text-[#B89A72] uppercase tracking-widest font-bold">
              ERROR 404 / PAGE NOT FOUND
            </span>
          </div>

          <h1 className="text-5xl sm:text-7xl font-bold text-white tracking-tight">
            NOTHING HERE.
          </h1>

          <p className="text-sm sm:text-base text-[#8D949E] max-w-md mx-auto leading-relaxed">
            The page you're looking for doesn't exist, has been moved, or is under active development.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <MagniarButton
            variant="primary"
            size="lg"
            onClick={onReturnHome}
            leftIcon={<ArrowLeft className="w-4 h-4" />}
          >
            BACK HOME
          </MagniarButton>

          <MagniarButton
            variant="secondary"
            size="lg"
            onClick={onViewWork}
            leftIcon={<Briefcase className="w-4 h-4" />}
          >
            VIEW WORK
          </MagniarButton>
        </div>
      </div>
    </div>
  );
};
