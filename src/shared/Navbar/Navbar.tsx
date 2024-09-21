import Container from "../Container/Container";
import Logo from "./Logo";
import MenuDropDown from "./MenuDropDown";
import MenuItem from "./MenuItem";

const Navbar = () => {
  // const token = useAppSelector(useCurrentToken);
  // console.log(token);
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-x-0.5">
            {/* Logo Section */}
            <div>
              <Logo />
            </div>

            {/* Menu Items: Hidden on smaller screens */}
            <div className="">
              <MenuItem />
            </div>

            {/* Menu Dropdown: Visible on all screens */}
            <div>
              <MenuDropDown />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
