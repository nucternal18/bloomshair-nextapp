import { Modal, Button, Divider } from "@mantine/core";

const HandleDeleteModal = ({
  open,
  data,
  isLoading,
  deleteHandler,
  setOpenModal,
}: {
  open: boolean;
  data: any;
  isLoading: boolean;
  type?: string;
  deleteHandler: (id: string, type?: string) => void;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Modal
      centered
      overlayColor="rgba(0, 0, 0, 0.5)"
      overlayOpacity={0.55}
      overlayBlur={3}
      size="sm"
      opened={open}
      onClose={() => setOpenModal(false)}
      title="Confirm Delete"
      closeOnClickOutside={false}
    >
      <div className="flex flex-col items-center justify-center space-y-2 p-4">
        <div className="w-full border-b py-4 text-center text-lg font-semibold">
          <p>Are you sure you want to delete?</p>
        </div>
        <div className="flex w-full items-center justify-between py-4">
          <Button
            type="button"
            variant="outline"
            className="font-medium hover:bg-blue-500 hover:text-white "
            onClick={() => setOpenModal(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="outline"
            color="red"
            loading={isLoading}
            className="font-medium  hover:bg-red-500 hover:text-white "
            onClick={() => deleteHandler(data?.id, data?.type)}
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default HandleDeleteModal;
