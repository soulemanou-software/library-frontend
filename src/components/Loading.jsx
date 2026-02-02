import { Loader2 } from 'lucide-react';

const Loading = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="h-10 w-10 text-primary-600 animate-spin" />
        <p className="text-gray-500 text-sm">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
