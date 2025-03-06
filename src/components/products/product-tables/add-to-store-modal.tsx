'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useRouter } from 'next/navigation';
import {
  createStoreInventory,
  getStores
} from '@/actions/inventory-store-actions';

interface AddToStoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId: number;
}

export const AddToStoreModal: React.FC<AddToStoreModalProps> = ({
  isOpen,
  onClose,
  productId
}) => {
  const [stores, setStores] = useState<{ id: number; store_name: string }[]>(
    []
  );
  const [storeId, setStoreId] = useState<string>('');
  const [stockQuantity, setStockQuantity] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchStores = async () => {
      const storeData = await getStores();
      setStores(storeData || []);
    };
    fetchStores();
  }, []);

  const handleSubmit = async () => {
    if (!storeId) return;

    setLoading(true);
    try {
      await createStoreInventory({
        store_id: Number(storeId),
        product_id: productId,
        stock_quantity: stockQuantity
      });

      onClose();
      router.refresh();
    } catch (error) {
      console.error('Failed to add product to store:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Product to Store</DialogTitle>
        </DialogHeader>
        <div className='space-y-4'>
          <Select onValueChange={setStoreId} value={storeId}>
            <SelectTrigger>
              <SelectValue placeholder='Select a Store' />
            </SelectTrigger>
            <SelectContent>
              {stores.map((store) => (
                <SelectItem key={store.id} value={store.id.toString()}>
                  {store.store_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            type='number'
            value={stockQuantity}
            onChange={(e) => setStockQuantity(Number(e.target.value))}
            placeholder='Stock Quantity'
            min={1}
          />
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? 'Adding...' : 'Add to Store'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
