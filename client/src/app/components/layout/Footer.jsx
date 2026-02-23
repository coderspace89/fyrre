"use client";

import React, { useState, useEffect } from "react";
import footerStyles from "./Footer.module.css";
import qs from "qs";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Footer = () => {
  const [footerData, setFooterData] = useState(null);

  const query = qs.stringify(
    {
      populate: {
        footer: {
          populate: {
            newsletterSection: true,
            navigationColumns: {
              populate: {
                links: true,
              },
            },
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
    const fetchFooter = async () => {
      const response = await fetch(`/api/global?${query}`);
      const data = await response.json();
      console.log(data?.data?.footer);
      setFooterData(data?.data?.footer);
    };
    fetchFooter();
  }, []);

  return (
    <section className={footerStyles.container}>
      <Container>
        <Row>
          <Col>1 of 1</Col>
        </Row>
      </Container>
    </section>
  );
};

export default Footer;
