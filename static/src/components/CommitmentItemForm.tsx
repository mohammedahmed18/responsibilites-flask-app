import React, { useState } from 'react';

type CommitmentFormProps = {
  onSubmit: (formData: CommitmentFormData) => void;
  initialData?: CommitmentFormData;
};

type CommitmentFormData = {
  details: string;
  notes: string;
  type: 'conference' | 'letter';
  users: string[];
};

const CommitmentForm: React.FC<CommitmentFormProps> = ({ onSubmit, initialData }) => {
  const [details, setDetails] = useState(initialData?.details || '');
  const [notes, setNotes] = useState(initialData?.notes || '');
  const [type, setType] = useState<'conference' | 'letter'>(initialData?.type || 'conference');
  const [users, setUsers] = useState<string[]>(initialData?.users || []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData: CommitmentFormData = {
      details,
      notes,
      type,
      users,
    };
    console.log({formData});
    
    onSubmit(formData);
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedUsers = Array.from(e.target.selectedOptions, (option) => option.value);
    setUsers(selectedUsers);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">

      {/* Commitment Form */}
      <form onSubmit={handleSubmit}>
        {/* Commitment Details */}
        <div className="mb-6">
          <label htmlFor="details" className="block text-sm font-medium text-gray-700">Commitment Details</label>
          <textarea
            id="details"
            name="details"
            rows={4}
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
            placeholder="Enter details about the commitment..."
          />
        </div>

        {/* Commitment Notes */}
        <div className="mb-6">
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Commitment Notes</label>
          <textarea
            id="notes"
            name="notes"
            rows={4}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
            placeholder="Add any additional notes..."
          />
        </div>

        {/* Commitment Type */}
        <div className="mb-6">
          <span className="block text-sm font-medium text-gray-700">Commitment Type</span>
          <div className="mt-2 flex items-center space-x-6">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="type"
                value="conference"
                checked={type === 'conference'}
                onChange={() => setType('conference')}
                className="form-radio text-indigo-600"
              />
              <span className="ml-2 text-gray-800">Conference</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="type"
                value="letter"
                checked={type === 'letter'}
                onChange={() => setType('letter')}
                className="form-radio text-indigo-600"
              />
              <span className="ml-2 text-gray-800">Letter</span>
            </label>
          </div>
        </div>

        {/* Users */}
        <div className="mb-6">
          <label htmlFor="users" className="block text-sm font-medium text-gray-700">Select Users</label>
          <select
            id="users"
            name="users"
            multiple
            value={users}
            onChange={handleUserChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            {/* Example users - Replace with actual user data */}
            <option value="1">User 1</option>
            <option value="2">User 2</option>
            <option value="3">User 3</option>
            <option value="4">User 4</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Submit Commitment
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommitmentForm;

