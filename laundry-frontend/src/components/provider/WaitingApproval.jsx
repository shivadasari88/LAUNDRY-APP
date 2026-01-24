const WaitingApproval = () => {
    return (
        <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow text-center">
            <h2 className="text-2xl font-bold mb-4 text-orange-600">
                Waiting for Admin Approval
            </h2>

            <p className="text-gray-700 mb-6">
                Your shop has been submitted successfully.
                <br />
                Please wait while an admin reviews and approves it.
            </p>

            <div className="mt-6 text-sm text-gray-500">
                ⏳ This usually takes a short time.
            </div>
        </div>
    );
};

export default WaitingApproval;
