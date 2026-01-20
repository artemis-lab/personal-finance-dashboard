import { Button, Modal, Select } from "@mantine/core";
import { useState } from "react";

const CATEGORIES = [
  "Cash",
  "Dining",
  "Electronics",
  "Entertainment",
  "Groceries",
  "Health & Fitness",
  "Healthcare",
  "Home Improvement",
  "Income",
  "Shopping",
  "Transfer",
  "Transportation",
  "Utilities",
];

interface CategoryEditModalProps {
  category?: string;
  opened: boolean;
  onClose: () => void;
  onSubmit: (category: string) => void;
}

const CategoryEditModal = ({
  category,
  opened,
  onClose,
  onSubmit,
}: CategoryEditModalProps) => {
  const [selectedCategory, setSelectedCategory] = useState(
    category ?? CATEGORIES[0],
  );

  const handleCategoryChange = (value: string | null) => {
    if (value) {
      setSelectedCategory(value);
    }
  };

  const handleSubmit = () => {
    if (selectedCategory) {
      onSubmit(selectedCategory);
    }
  };

  const isDisabled = category !== undefined && selectedCategory === category;

  return (
    <Modal centered opened={opened} title="Edit Category" onClose={onClose}>
      <Select
        searchable
        data={CATEGORIES}
        label="Category"
        value={selectedCategory}
        onChange={handleCategoryChange}
      />
      <div className="mt-4 flex justify-end gap-2">
        <Button variant="default" onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={isDisabled} onClick={handleSubmit}>
          Update
        </Button>
      </div>
    </Modal>
  );
};

export default CategoryEditModal;
