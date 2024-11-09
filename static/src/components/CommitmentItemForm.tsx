import React, { useState } from 'react';
import { api } from '../api/api';

type CommitmentFormProps = {
  initialData?: CommitmentFormData;
  allUsers: { id: number, name: string, rotba: string }[]
  parentCommitmentId: number
};

type CommitmentFormData = {
  id?: number;
  details: string;
  notes?: string;
  type: 'CONFERENCE' | 'LETTER';
  users: string[];
};

const CommitmentForm: React.FC<CommitmentFormProps> = ({ initialData, allUsers, parentCommitmentId }) => {
  const [loading, setLoading] = useState(false)
  const [details, setDetails] = useState(initialData?.details || '');
  const [notes, setNotes] = useState(initialData?.notes || '');
  const [type, setType] = useState<'CONFERENCE' | 'LETTER'>(initialData?.type || 'CONFERENCE');
  const [users, setUsers] = useState<string[]>(initialData?.users || []);

  const isEdit = !!initialData?.id
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData: CommitmentFormData = {
      details,
      notes,
      type,
      users,
    };

    try {
      setLoading(true)
      if (isEdit) {
        await api.put("/res-item", { ...formData, responsibility_id: parentCommitmentId, id: initialData.id })
      } else {
        await api.post("/res-item", { ...formData, responsibility_id: parentCommitmentId })
      }
      window.location.reload()
    } finally {
      setLoading(false)
    }

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
                value="CONFERENCE"
                checked={type === 'CONFERENCE'}
                onChange={() => setType('CONFERENCE')}
                className="form-radio text-indigo-600"
              />
              <span className="ml-2 text-gray-800">CONFERENCE</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="type"
                value="LETTER"
                checked={type === 'LETTER'}
                onChange={() => setType('LETTER')}
                className="form-radio text-indigo-600"
              />
              <span className="ml-2 text-gray-800">LETTER</span>
            </label>
          </div>
        </div>

        {/* Users */}
        <div className="mb-6">
          <label htmlFor="users" className="block text-sm font-medium text-gray-700">Select associated people</label>
          <select
            id="users"
            name="users"
            multiple
            value={users}
            onChange={handleUserChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            {
              allUsers.map(u => (
                <option key={u.id} value={u.id}>{u.rotba + "\/" + u.name} </option>
              ))
            }
          </select>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={loading}
          >
            {isEdit ? "Edit Commitment" : "Submit Commitment"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommitmentForm;

