type Props = {
  onDelete: () => void;
  onClose: () => void;
};

export default function DeleteGerbang({ onDelete, onClose }: Props) {
  return (
    <div>
      <h1 className="text-sm">
        Apakah Anda ingin menghapus data ini?
      </h1>

      <div className="mt-4 space-y-4">
        <button
          className="border rounded-md w-full"
          onClick={onClose}
        >
          <p className="text-primary text-sm font-medium py-5">
            Tidak
          </p>
        </button>

        <button
          className="border bg-primary rounded-md w-full"
          onClick={onDelete}
        >
          <p className="text-white text-sm font-medium py-5">
            Ya, Hapus Data
          </p>
        </button>
      </div>
    </div>
  );
}
