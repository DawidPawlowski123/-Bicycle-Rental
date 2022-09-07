import { useState, useEffect } from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import AuthService from "../services/auth.service";


const Header = () => {

  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="primary"
      variant="dark"
      className="d-flex align-items-center justify-content-evenly"
    >
      <Container fluid className="custom_header">
        <Navbar.Brand>
          <h1 className="mb-0">
            <Link to="/" className="custom_title">
              WYPO.
            </Link>
          </h1>
          <p className="mb-1 custom_subTitle d-none d-lg-block">
            Wypożyczalnia <br /> Rowerów
          </p>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <>
              {showAdminBoard && (
                <NavLink to="/ShowUser" activeClassName="link_active" className="custom_link">
                  Klient
                </NavLink>
              )}
              {/* {showModeratorBoard && (
                <NavLink to="/CreateUser" activeClassName="link_active" className="custom_link">
                  Stwórz użytkownika
                </NavLink>
              )}
              {showAdminBoard && (
                <NavLink to="/ShowUser" activeClassName="link_active" className="custom_link">
                  Wyświetl użytkowników
                </NavLink>
              )} */}
              {showAdminBoard && (
                <NavLink to="/ShowEquipment" activeClassName="link_active" className="custom_link">
                  Asortyment
                </NavLink>
              )}
              {/*showAdminBoard && (
                <NavLink to="/CreateEquipment" activeClassName="link_active" className="custom_link">
                  Stwórz wyposażenie
                </NavLink>
              )}
              {showAdminBoard && (
                <NavLink to="/ShowEquipment" activeClassName="link_active" className="custom_link">
                  Wyświetl wyposażenie
                </NavLink>
              )} */}
            </>

            {currentUser ? (
              <>
                <NavLink to="/profile" activeClassName="link_active" className="custom_link">
                  {currentUser.username}

                </NavLink>

                <NavLink
                  activeClassName="link_active"
                  to="/login"
                  className="custom_link"
                  onClick={logOut}
                >
                  Logout
                </NavLink>
              </>
            ) : (
              <NavLink to="/login" activeClassName="link_active" className="custom_link">
                Login
              </NavLink>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
