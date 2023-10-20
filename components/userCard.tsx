import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
} from "@nextui-org/react";
import { signOut } from "next-auth/react";

export default function UserCard({ session }) {
  return (
    <div className="flex items-center gap-4 bg-background/30 border-white/20 border-1 overflow-hidden py-4 before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
      <Dropdown backdrop="blur" placement="bottom-start">
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              src: session?.data?.user?.image,
            }}
            className="transition-transform"
            description={session?.data?.user?.email}
            name={session?.data?.user?.name}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-bold">Signed in as</p>
            <p className="font-bold">{session?.data?.user?.email}</p>
          </DropdownItem>
          <DropdownItem onClick={() => signOut()} key="logout" color="danger">
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
