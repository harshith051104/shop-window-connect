import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/hooks/useCart";

const NameEntryDialog = () => {
    const { userName, setUserName } = useCart();
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");

    useEffect(() => {
        // Open if userName is missing
        if (!userName) {
            setOpen(true);
        }
    }, [userName]);

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();
        const cleanName = name.trim().replace(/[<>]/g, ""); // Basic sanitization
        if (cleanName) {
            setUserName(cleanName);
            setOpen(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={(val) => {
            // Prevent closing if no name set? 
            // User requested "firstly it should pop up"
            // We'll treat it as modal but allow closing if user really wants to browse anonymously?
            // "Price should be appearing in cart... order from Name" implies Name is important.
            // Re-opening behavior ensures it feels mandatory without being completely blocking if using onOpenChange logic carefully.
            // For now, allow close but maybe it pops up again? Or better, force it.
            if (!val && !name.trim() && !userName) {
                // user trying to close without name
                // checking requirements: "it should pop up enter your name"
                // Let's force it slightly by disabling clicking outside -> pointer-events-none on overlay?
                // Dialog primitive might handle this.
            } else {
                setOpen(val);
            }
        }}>
            <DialogContent className="sm:max-w-md" onInteractOutside={(e) => {
                if (!userName) e.preventDefault();
            }}>
                <DialogHeader>
                    <DialogTitle>Welcome to Nandi Stationery</DialogTitle>
                    <DialogDescription>
                        Please enter your name to start your order.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">Your Name</label>
                        <Input
                            id="name"
                            placeholder="e.g. John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value.slice(0, 50))} // Limit length
                            maxLength={50}
                            autoFocus
                        />
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={!name.trim()} className="w-full">
                            Continue
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default NameEntryDialog;
