"use client";

import React, { useState, useEffect } from "react";
import headerStyles from "./Header.module.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import qs from "qs";
import Image from "next/image";
import { getStrapiMedia } from "@/lib/utils";
import Link from "next/link";

const Header = () => {
  const [headerData, setHeaderData] = useState(null);

  const query = qs.stringify(
    {
      populate: {
        header: {
          populate: {
            image: true,
            navigation: true,
            socialLinks: {
              populate: ["image"],
            },
          },
        },
      },
    },
    {
      encodeValuesOnly: true,
    },
  );

  useEffect(() => {
    const fetchHeader = async () => {
      const response = await fetch(`/api/global?${query}`);
      const data = await response.json();
      console.log(data?.data?.header);
      setHeaderData(data?.data?.header);
    };
    fetchHeader();
  }, []);

  return (
    <section className={`${headerStyles.headerContainer} fixed-top`}>
      <Navbar expand="lg">
        <Container
          className={`container-xxl container-xl container-lg container-md container-sm container ${headerStyles.navContainer}`}
        >
          <Navbar.Brand href="/">
            {headerData?.image && (
              <Image
                src={getStrapiMedia(headerData?.image?.url)}
                width={headerData?.image.width}
                height={headerData?.image?.height}
                alt={headerData?.image?.name}
                className={headerStyles.logoImage}
              />
            )}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <div className="d-flex flex-lg-row flex-column justify-content-center align-items-center">
                {!headerData?.hideLinksOnHome &&
                  headerData?.navigation?.map((navItem) => (
                    <Nav.Link
                      key={navItem.id}
                      href={navItem.url}
                      className={headerStyles.navLinks}
                    >
                      {navItem.label}
                    </Nav.Link>
                  ))}
              </div>
            </Nav>
            {!headerData?.hideLinksOnHome && (
              <div className={headerStyles.divider}>
                <svg
                  width="15"
                  height="1"
                  viewBox="0 0 15 1"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="15" height="1" fill="black" />
                </svg>
              </div>
            )}
            <div className="d-flex justify-content-center">
              {!headerData?.hideLinksOnHome &&
                headerData?.socialLinks?.map((socialLink) => (
                  <div key={socialLink.id}>
                    {socialLink?.image && (
                      <Link href={socialLink?.url}>
                        <Image
                          src={getStrapiMedia(socialLink?.image?.url)}
                          width={socialLink?.image?.width}
                          height={socialLink?.image?.height}
                          alt={socialLink?.image?.name}
                          className={headerStyles.socialIcon}
                        />
                      </Link>
                    )}
                  </div>
                ))}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </section>
  );
};

export default Header;
