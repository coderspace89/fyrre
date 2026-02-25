"use client";

import React, { useState, useEffect } from "react";
import footerStyles from "./Footer.module.css";
import qs from "qs";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Link from "next/link";
import Image from "next/image";
import { getStrapiMedia } from "@/lib/utils";

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
      <div className={footerStyles.tickerContainer}>
        <div className={footerStyles.tickerWrapper}>
          <div className={footerStyles.tickerContent}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
              <span key={index} className={footerStyles.tickerText}>
                {footerData?.newsletterSection?.scrollingText}
              </span>
            ))}
          </div>
        </div>
      </div>
      <Container>
        <Row className={footerStyles.newsletterContainer}>
          <Col lg={7} md={6}>
            <div>
              <h2 className={footerStyles.newsletterHeading}>
                {footerData?.newsletterSection?.headline}
              </h2>
            </div>
          </Col>
          <Col lg={5} md={6}>
            <Form className="d-lg-flex align-items-lg-end justify-content-lg-end">
              <div className={footerStyles.inputContainer}>
                <Form.Control
                  type="email"
                  placeholder={footerData?.newsletterSection?.emailPlaceholder}
                  className={footerStyles.formInput}
                />
              </div>
              <Button variant="light" className={footerStyles.formBtn}>
                {footerData?.newsletterSection?.buttonText}
              </Button>
            </Form>
          </Col>
        </Row>
        <Row className={footerStyles.navigationContainer}>
          <Col lg={12}>
            <div>
              <h4 className={footerStyles.footerTitle}>
                {footerData?.mainFooterTitle}
              </h4>
            </div>
          </Col>
          {footerData?.navigationColumns?.map((column) => (
            <Col lg={4} md={4} xs={6} key={column?.id}>
              <div className="d-flex align-items-lg-end justify-content-lg-end">
                <ul className="list-unstyled">
                  {column.links.map((link) => (
                    <li key={link.id} className={footerStyles.linksContainer}>
                      <Link href={link.url} className={footerStyles.linkText}>
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Col>
          ))}
        </Row>
        <Row className={footerStyles.copyrightContainer}>
          <Col lg={12}>
            <div className="d-flex justify-content-between align-items-center flex-lg-row flex-md-row flex-column">
              <span className={footerStyles.copyrightText}>
                {footerData?.copyrightText}
              </span>
              <div className="mt-lg-0 mt-md-0 mt-2">
                {footerData?.socialLinks?.map((socialLink) => (
                  <Link
                    key={socialLink.id}
                    href={socialLink.url}
                    className={footerStyles.iconImageContainer}
                  >
                    {socialLink.image && (
                      <Image
                        src={getStrapiMedia(socialLink.image.url)}
                        width={socialLink.image.width}
                        height={socialLink.image.height}
                        alt={socialLink.image.name}
                        className={footerStyles.iconImage}
                      />
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Footer;
