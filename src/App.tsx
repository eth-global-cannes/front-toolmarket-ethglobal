import { ConnectWalletButton } from '@/components/ions/connect-wallet-button';
import { LanguageSelector } from '@/components/ions/language-selector';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { PlusIcon } from 'lucide-react';

export const App = () => {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <div className="text-white h-20 border-b border-gray-300 bg-white mx-auto w-full">
        <div className="flex items-center justify-between h-full" style={{ maxWidth: '92.5rem', margin: '0 auto' }}>
          <div className="flex items-center">
            {/* Logo Placeholder */}
            <div className="border-2 border-orange-500 w-12 h-12 flex items-center justify-center rounded-full">
              {/* <Image src="/logo.png" alt="Logo" width={40} height={40} /> */}
            </div>
            <h1 className="text-2xl font-bold font-display ml-3 text-[#e4793c]">ToolMarket</h1>
          </div>
          <div className="flex items-center gap-4">
            {/* Language Selector using Custom Select */}
            <LanguageSelector />

            {/* Wallet Connection */}
            <ConnectWalletButton />

            {/* Create agent */}
            <Dialog>
              <DialogTrigger asChild>
                

            <button className="bg-tm-orange text-white p-1.5 border border-gray-300 rounded-full px-3 
            flex items-center gap-2 hover:bg-tm-orange/70 hover:text-white hover:border-tm-orange transition-all duration-300 
            cursor-pointer
            ">
              <PlusIcon className="w-4 h-4" size={16} strokeWidth={2.5} />
              Create agent
            </button>
              </DialogTrigger>
              <DialogContent> 
                <DialogHeader>
                  <DialogTitle>Create agent</DialogTitle>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Grid of Cards */}
      <div className="mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 max-w-[92.5rem] mt-8">
        {/* Search Input */}
        <div className="col-span-full mb-4">
          <input
            type="text"
            placeholder="Search for a name"
            className="w-full p-2 pl-4 border border-neutral-300 rounded-lg h-12"
          />
        </div>
        {[...Array(4)].map((_, index) => (
          <div key={index} className="border border-gray-300 rounded-lg overflow-hidden">
            {/* Card Image Banner */}
            <div className="bg-gray-200 w-full h-48 flex items-center justify-center">
              <span className="text-black/70">Image {index + 1}</span>
            </div>
            <div className="p-4">
              <h2 className="text-xl font-medium font-display mb-2">Product Title {index + 1}</h2>
              <p className="text-black/70 mb-4">This is a description of the product. It provides details about the features and benefits.</p>
              <div className="flex items-center mb-2">
                <span className="text-yellow-500">★★★★★</span>
                <span className="ml-2 text-black/70">5 stars</span>
              </div>
              <p className="text-black/70">Number of votes: 123</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}