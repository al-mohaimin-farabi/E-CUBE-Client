import MobileNavbar from '@/components/layout/MobileNavbar';
import DesktopNav from '@/components/layout/DesktopNav';

const Navbar = ({ isVisible }: { isVisible: boolean }) => {
  return (
    <>
      <DesktopNav isVisible={isVisible} />
      <MobileNavbar isVisible={isVisible} />
    </>
  );
};

export default Navbar;
