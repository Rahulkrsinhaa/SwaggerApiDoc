import React, { useState } from 'react';
import ListBox from '../../components/ui/ListBox';
import TransferButton from '../../components/ui/TransferButton';
import Button from '../../components/ui/Button';
import DefineTemplate from '../../components/DefineTemplate/DefineTemplate';

const DefineType = () => {
  const [availableItems, setAvailableItems] = useState(['Gallon', 'Quart']);
  const [assignedItems, setAssignedItems] = useState(['Litre', 'Millilitre']);
  const [selectedAvailable, setSelectedAvailable] = useState([]);
  const [selectedAssigned, setSelectedAssigned] = useState([]);

  const typeOptions = ['Solid', 'Gas', 'Electricity', 'Liquid'];
  const [selectedType, setSelectedType] = useState('');

  const moveToAssigned = () => {
    if (selectedAvailable.length > 0) {
      setAssignedItems([...assignedItems, ...selectedAvailable]);
      setAvailableItems(availableItems.filter(item => !selectedAvailable.includes(item)));
      setSelectedAvailable([]);
    }
  };

  const moveToAvailable = () => {
    if (selectedAssigned.length > 0) {
      setAvailableItems([...availableItems, ...selectedAssigned]);
      setAssignedItems(assignedItems.filter(item => !selectedAssigned.includes(item)));
      setSelectedAssigned([]);
    }
  };

  const handleSave = () => {
    console.log('Saving configuration:', {
      selectedType,
      availableItems,
      assignedItems
    });
    alert('Configuration saved successfully!');
  };

  return (
    <>
       <DefineTemplate title="Define Type" />

    <div className="bg-white shadow-lg p-2">
      <div className="mt-4 flex flex-col lg:flex-row gap-6 items-start lg:items-center">
        <div className="flex-1">
          <ListBox
            title="Select Type"
            items={typeOptions}
            selectedItems={selectedType ? [selectedType] : []}
            onSelectionChange={(items) => setSelectedType(items[0] || '')}
          />
        </div>

        <div className="flex-1">
          <ListBox
            title="Available Units"
            items={availableItems}
            selectedItems={selectedAvailable}
            onSelectionChange={setSelectedAvailable}
          />
        </div>


        {/* Transfer Controls - Positioned between Available and Assigned */}
        <div className="flex flex-col items-center justify-center space-y-2">
          <TransferButton 
            direction="right"
            onClick={moveToAssigned}
            disabled={selectedAvailable.length === 0}
          />
          <TransferButton
            direction="left"
            onClick={moveToAvailable}
            disabled={selectedAssigned.length === 0}
          />
        </div>

        <div className="flex-1">
          <ListBox
            title="Assigned Unit"
            items={assignedItems}
            selectedItems={selectedAssigned}
            onSelectionChange={setSelectedAssigned}
          />
        </div>


        <div></div> {/* Empty space for balance */}
      </div>

      {/* Save Button */}
      <div className="flex justify-center mt-10">
        <Button onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
        </>
  );
};

export default DefineType;