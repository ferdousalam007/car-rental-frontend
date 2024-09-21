/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Space, Table, Tag } from "antd";
import { userManagementApi } from "../../../../redux/features/Admin/userManagementApi";
import { toast } from "sonner";
import { TUser } from "../../../../type/global.type";
import { userApi } from "../../../../redux/features/user/userApi";
import Loader from "../../../../shared/Loader/Loader";
import Swal from "sweetalert2";

const AdminAllUser = () => {
  const { data: allUser, isLoading: isLoadingAllUsers } =
    userManagementApi.useGetAllUserQuery(undefined);
  const userData = allUser?.data;

  const [updateRole] = userManagementApi.useMakeAdminMutation();
  const [deleteUser] = userApi.useDeleteUserMutation();

  const tableData = userData?.map((item: TUser) => ({
    key: item._id,
    userName: item?.name,
    userEmail: item?.email,
    role: item?.role,
    phone: item?.phone,
    status: item?.isDeleted ? "Blocked" : "Active",
  }));

  // delete user with SweetAlert confirmation
  const handleDeleteUser = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteUser(id).unwrap();
          toast.success("User Deleted Successfully");
        } catch (error: any) {
          toast.error(error.message);
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        toast.info("Delete action cancelled");
      }
    });
  };

  // update role with SweetAlert confirmation
  const updateRoleHandler = async (userId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to update the user's role?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, update it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await updateRole(userId).unwrap();
          toast.success("User Role Updated Successfully");
        } catch (error: any) {
          toast.error(error.message);
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        toast.info("Update action cancelled");
      }
    });
  };

  const columns = [
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Email",
      dataIndex: "userEmail",
      key: "userEmail",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "Blocked" ? "red" : "green"}>{status}</Tag>
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: string) => (
        <Tag color={role === "admin" ? "green" : "blue"}>{role}</Tag>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Action",
      key: "action",
      render: (item: any) => (
        <Space size="middle">
          <Button onClick={() => updateRoleHandler(item.key)}>
            Update Role
          </Button>
          <Button
            onClick={() => handleDeleteUser(item.key)}
            disabled={item.status === "Blocked"}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen p-4">
      <div className="bg-gradient-to-r from-slate-500 p-8 mb-10 rounded-lg shadow-md">
        <h2 className="text-4xl font-bold text-center text-white">
          Manage All <span className="text-yellow-300">Users</span>
        </h2>
      </div>
      {isLoadingAllUsers ? (
        <div className="flex justify-center items-center h-full">
          <Loader />
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={tableData || []}
          pagination={false}
          className="overflow-x-auto"
        />
      )}
    </div>
  );
};

export default AdminAllUser;
