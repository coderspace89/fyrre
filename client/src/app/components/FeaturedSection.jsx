"use client";

import React, { useState, useEffect } from "react";
import featuredStyles from "./FeaturedSection.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import qs from "qs";
import Link from "next/link";
import { getStrapiMedia, formatDate, slugify } from "@/lib/utils";
import Image from "next/image";

const FeaturedSection = () => {
  const [featuredData, setFeaturedData] = useState(null);

  const query = qs.stringify(
    {
      populate: {
        featuredSection: {
          populate: {
            details: true,
            image: true,
          },
        },
      },
    },
    {
      encodeValuesOnly: true,
    },
  );

  useEffect(() => {
    const fetchFeaturedSection = async () => {
      const response = await fetch(`/api/home-page?${query}`);
      const data = await response.json();
      console.log(data?.data?.featuredSection);
      setFeaturedData(data?.data?.featuredSection);
    };
    fetchFeaturedSection();
  }, []);

  const prefix = "magazine";
  const slug = slugify(featuredData?.mainTitle || "/");
  const fullUrl = `/${prefix}/${slug}`;

  return (
    <section className={featuredStyles.container}>
      <Container>
        <Link href={fullUrl} className="text-decoration-none">
          <Row className={featuredStyles.featuredTextContainer}>
            <Col lg={6}>
              <div>
                <h2 className={featuredStyles.mainTitle}>
                  {featuredData?.mainTitle}
                </h2>
              </div>
            </Col>
            <Col lg={6}>
              <div className={featuredStyles.descriptionContainer}>
                <p className={featuredStyles.description}>
                  {featuredData?.description}
                </p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <span className={featuredStyles.detailsItem}>
                    <span>Text</span>
                    {featuredData?.details?.author}
                  </span>
                  <span className={featuredStyles.detailsItem}>
                    <span>Date</span>{" "}
                    {formatDate(featuredData?.details?.publicationDate)}
                  </span>
                  <span className={featuredStyles.detailsItem}>
                    <span>Duration</span>
                    {featuredData?.details?.duration}
                  </span>
                </div>
                <div className={featuredStyles.labelContainer}>
                  <span className={featuredStyles.labelText}>
                    {featuredData?.details?.label}
                  </span>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              {featuredData?.image && (
                <Image
                  src={getStrapiMedia(featuredData?.image?.url)}
                  width={featuredData?.image?.width}
                  height={featuredData?.image?.height}
                  alt={featuredData?.image?.name}
                  className={featuredStyles.featuredImage}
                />
              )}
            </Col>
          </Row>
        </Link>
      </Container>
    </section>
  );
};

export default FeaturedSection;
