import { useState } from "react";
import { addServiceType } from "../../api/catalogApi";

const AddServiceModal = ({ onAdded }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return alert("Service name required");

    setLoading(true);
    try {
      // ✅ Payload now handled by backend security
      const payload = { serviceName: name };
      console.log("Submitting Payload:", payload);

      await addServiceType(payload);

      setName("");
      setOpen(false);
      onAdded();
    } catch (error) {
      console.error("Backend Error:", error);
      // Show specific error from backend if available
      const errMsg = error.response?.data?.message || "Failed to add service. Check console.";
      alert(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium shadow-lg shadow-indigo-500/30 transition-all flex items-center gap-2"
      >
        <span className="text-xl leading-none">+</span> Add Service
      </button>

      {open && (
        // Dark Overlay with Z-Index
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-slate-800 border border-slate-700 p-6 rounded-2xl w-full max-w-sm shadow-2xl animate-in fade-in zoom-in duration-200">
            <h3 className="text-xl font-bold text-white mb-4">Add New Service</h3>

            <form onSubmit={submit}>
              <div className="mb-5">
                <label className="block text-sm font-medium text-slate-400 mb-1">Service Name</label>
                <input
                  autoFocus
                  placeholder="e.g. Dry Cleaning"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-600 text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium shadow-lg shadow-indigo-500/40 disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddServiceModal;