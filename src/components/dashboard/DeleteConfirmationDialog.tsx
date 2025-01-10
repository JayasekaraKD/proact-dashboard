import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

interface DeleteConfirmationDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    isLoading: boolean;
    title: string;
    relationName: string;
}

const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({
    isOpen,
    onClose,
    onConfirm,
    isLoading,
    title,
    relationName
}) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-red-600">{title}</DialogTitle>
                </DialogHeader>

                <div className="py-4">
                    <p className="text-gray-600">
                        Are you sure you want to delete the relationship with <span className="font-medium">{relationName}</span>?
                        This action cannot be undone.
                    </p>
                    <div className="mt-2 bg-yellow-50 p-3 rounded-md">
                        <p className="text-sm text-yellow-800">
                            This will also delete all associated:
                        </p>
                        <ul className="mt-1 text-sm text-yellow-700 list-disc list-inside">
                            <li>Contact persons</li>
                            <li>Documents</li>
                            <li>Notes</li>
                            <li>Financial records</li>
                        </ul>
                    </div>
                </div>

                <DialogFooter className="flex gap-3">
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={isLoading}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md disabled:opacity-50 flex items-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <span className="material-icons animate-spin text-sm">refresh</span>
                                Deleting...
                            </>
                        ) : (
                            'Delete Relationship'
                        )}
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteConfirmationDialog;