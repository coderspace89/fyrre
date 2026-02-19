"use client";

import React, { useState, useEffect } from "react";
import podcastStyles from "./PodcastSection.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import qs from "qs";
import { getStrapiMedia, formatDate } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

const PodcastSection = () => {
  const [sectionHeaderData, setSectionHeaderData] = useState(null);
  const [podcastData, setPodcastData] = useState(null);

  const sectionHeaderQuery = qs.stringify(
    {
      populate: {
        podcastSection: true,
      },
    },
    {
      encodeValuesOnly: true,
    },
  );

  const podcastQuery = qs.stringify(
    {
      populate: {
        image: true,
        audioFile: true,
      },
      sort: ["publicationDate:asc"],
      pagination: {
        page: 1,
        pageSize: 3,
      },
    },
    {
      encodeValuesOnly: true,
    },
  );

  useEffect(() => {
    const fetchSectionHeader = async () => {
      const response = await fetch(`/api/home-page?${sectionHeaderQuery}`);
      const data = await response.json();
      console.log(data?.data?.podcastSection);
      setSectionHeaderData(data?.data?.podcastSection);
    };
    fetchSectionHeader();
  }, []);

  useEffect(() => {
    const fetchPodcastData = async () => {
      const response = await fetch(`/api/podcasts?${podcastQuery}`);
      const data = await response.json();
      console.log(data?.data);
      setPodcastData(data?.data);
    };
    fetchPodcastData();
  }, []);

  return (
    <section className={podcastStyles.container}>
      <Container className={podcastStyles.containerRow}>
        <Row>
          <Col lg={12}>
            <div className="d-flex align-items-center justify-content-between">
              <h2>{sectionHeaderData?.title}</h2>
              <Link href={sectionHeaderData?.viewAllLink || "/podcast"}>
                {sectionHeaderData?.viewAllText}
                <span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.172 11.0002L10.808 5.63617L12.222 4.22217L20 12.0002L12.222 19.7782L10.808 18.3642L16.172 13.0002H4V11.0002H16.172Z"
                      fill="black"
                    />
                  </svg>
                </span>
              </Link>
            </div>
          </Col>
        </Row>
        <Row>
          {podcastData?.map((podcast) => (
            <Col lg={4} key={podcast.id}>
              <div>
                <div>
                  {podcast?.image && (
                    <Image
                      src={getStrapiMedia(podcast.image?.url)}
                      width={podcast?.image?.width}
                      height={podcast?.image?.height}
                      alt={podcast?.image?.name}
                      className={podcastStyles.podcastImage}
                    />
                  )}
                </div>
                <div>
                  <h3>{podcast?.title}</h3>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default PodcastSection;
