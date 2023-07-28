import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "./submenu.module.css";
import styled from 'styled-components';
import Link from "next/link"

const Nav = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: #fff;
  padding: 1rem;
  margin: 0 5rem 0 5rem;
  @media (max-width: 767px) {
    margin: 0;
  }
`;

const MobileNavToggle = styled.button`
  display: block;
  background-color: transparent;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: #1677ff;
  }

  @media (min-width: 768px) {
    display: none;
  }
`;

const DesktopNav = styled.ul`
  display: flex;
  flex-direction: row;
  width: 100%;
  text-align: center;
  padding-left: 0rem;
  background-color: #ffffff;
  @media (max-width: 767px) {
    display: none;
  }
`;

const MobileNav = styled.ul`
  display: none;
  flex-direction: column;
  margin: 0;
  padding: 0;
  @media (max-width: 767px) {
    display: flex;
  }
`;

const Submenu = ({ headerInfo, own_page }) => {
  const router = useRouter();
  const view_user_id = router.query.profile;
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const NavItem = styled.li`
    list-style: none;
    padding-left: 0rem;
    width: ${own_page ? '20%' : '25%'};
    padding: 15px;
    border-right: 3px solid #000;
    a {
      color: #000;
      text-decoration: none;
      transition: all 0.3s ease;
      font-weight: 600;
      &:hover {
        color: #4096ff;
      }
      @media (max-width: 767px) {
        color: #fff;
      }
    }
    @media (max-width: 767px) {
      width: 100%;
      padding: 7px;
    }
  `;
  return (
    <Nav>
      <MobileNavToggle onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}>
        {isMobileNavOpen ? 'Close' : 'Profile Menu'}
      </MobileNavToggle>
      <DesktopNav>
        <NavItem className={
          router.pathname == `/profile/[profile]/activity`
            ? styles.active
            : ""
        }>
          <Link href={`/profile/${view_user_id}/activity`}>
            Activity
          </Link>
        </NavItem>
        <NavItem className={
          router.pathname == `/profile/[profile]/shout-outs`
            ? styles.active
            : ""
        }>
          <Link href={`/profile/${view_user_id}/shout-outs`}>
            Shout outs
          </Link>
        </NavItem>
        <NavItem
          className={
            router.pathname == `/profile/[profile]/followers`
              ? styles.active
              : ""
          }>
          <Link href={`/profile/${view_user_id}/followers`}>
            Followers
          </Link>
        </NavItem>
        {headerInfo?.profile?.usertype === "partner" ?
          <NavItem
            className={
              router.pathname == `/profile/[profile]/locations`
                ? styles.active
                : ""
            }>
            <Link href={`/profile/${view_user_id}/locations`}>
              Locations
            </Link>
          </NavItem>
          :
          headerInfo?.profile?.usertype === "eventhost" ?
            <NavItem
              className={
                router.pathname == `/profile/[profile]/events`
                  ? styles.active
                  : ""
              }>
              <Link href={`/profile/${view_user_id}/events`}>
                Events
              </Link>
            </NavItem> :
            <NavItem
              className={
                router.pathname == `/profile/[profile]/favorites`
                  ? styles.active
                  : ""
              }>
              <Link href={`/profile/${view_user_id}/favorites`}>
                Favorite
              </Link>
            </NavItem>
        }
        {own_page ? <NavItem className={
          router.pathname == `/profile/[profile]/social`
            ? styles.active
            : ""
        }>
          <Link href={`/profile/${view_user_id}/social`}>
          Pinpoint Social

          </Link>
        </NavItem> : ''}
      </DesktopNav>
      <MobileNav style={{ display: isMobileNavOpen ? 'flex' : 'none' }}>
        <NavItem className={
          router.pathname == `/profile/[profile]/activity`
            ? styles.active
            : ""
        }>
          <Link href={`/profile/${view_user_id}/activity`}>
            Activity
          </Link>
        </NavItem>
        <NavItem className={
          router.pathname == `/profile/[profile]/shout-outs`
            ? styles.active
            : ""
        }>
          <Link href={`/profile/${view_user_id}/shout-outs`}>
            Shout outs
          </Link>
        </NavItem>
        <NavItem
          className={
            router.pathname == `/profile/[profile]/followers`
              ? styles.active
              : ""
          }>
          <Link href={`/profile/${view_user_id}/followers`}>
            Followers
          </Link>
        </NavItem>
        {headerInfo?.profile?.usertype === "partner" ?
          <NavItem
            className={
              router.pathname == `/profile/[profile]/locations`
                ? styles.active
                : ""
            }>
            <Link href={`/profile/${view_user_id}/locations`}>
              Locations
            </Link>
          </NavItem>
          :
          headerInfo?.profile?.usertype === "eventhost" ?
            <NavItem
              className={
                router.pathname == `/profile/[profile]/events`
                  ? styles.active
                  : ""
              }>
              <Link href={`/profile/${view_user_id}/events`}>
                Events
              </Link>
            </NavItem> :
            <NavItem
              className={
                router.pathname == `/profile/[profile]/favorites`
                  ? styles.active
                  : ""
              }>
              <Link href={`/profile/${view_user_id}/favorites`}>
                Favorite
              </Link>
            </NavItem>
        }
        {own_page ? <NavItem className={
          router.pathname == `/profile/[profile]/social`
            ? styles.active
            : ""
        }>
          <Link href={`/profile/${view_user_id}/social`}>
           Pinpoint Social
          </Link>
        </NavItem> : ''}

      </MobileNav>
    </Nav>
    // <div className="container">
    //   <div className="row justify-content-center">
    //     <div className="user-profile-submenu">
    //       <ul>
    //         <li>
    //           <Link href={`/profile/${view_user_id}/activity`}>
    //             <a
    //               className={
    //                 router.pathname == `/profile/[profile]/activity`
    //                   ? "active"
    //                   : ""
    //               }
    //             >
    //               Activity
    //             </a>
    //           </Link>
    //         </li>
    //         <li>
    //           <Link href={`/profile/${view_user_id}/shout-outs`}>
    //             <a
    //               className={
    //                 router.pathname == `/profile/[profile]/shout-outs`
    //                   ? "active"
    //                   : ""
    //               }
    //             >
    //               Shout outs
    //             </a>
    //           </Link>
    //         </li>
    //         <li>
    //           <Link href={`/profile/${view_user_id}/followers`}>
    //             <a
    //               className={
    //                 router.pathname == `/profile/[profile]/followers`
    //                   ? "active"
    //                   : ""
    //               }
    //             >
    //               Followers
    //             </a>
    //           </Link>
    //         </li>
    //         {headerInfo?.profile?.usertype === "partner" ?
    //           <li>
    //             <Link href={`/profile/${view_user_id}/locations`}>
    //               <a
    //                 className={
    //                   router.pathname == `/profile/[profile]/locations`
    //                     ? "active"
    //                     : ""
    //                 }
    //               >
    //                 Locations
    //               </a>
    //             </Link>
    //           </li>
    //           :
    //           headerInfo?.profile?.usertype === "eventhost" ?
    //             <li>
    //               <Link href={`/profile/${view_user_id}/events`}>
    //                 <a
    //                   className={
    //                     router.pathname == `/profile/[profile]/events`
    //                       ? "active"
    //                       : ""
    //                   }
    //                 >
    //                   Events
    //                 </a>
    //               </Link>
    //             </li>
    //             :
    //             <li>
    //               <Link href={`/profile/${view_user_id}/favorites`}>
    //                 <a
    //                   className={
    //                     router.pathname == `/profile/[profile]/favorites`
    //                       ? "active"
    //                       : ""
    //                   }
    //                 >
    //                   Favorites
    //                 </a>
    //               </Link>
    //             </li>
    //         }
    //       </ul>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Submenu;
