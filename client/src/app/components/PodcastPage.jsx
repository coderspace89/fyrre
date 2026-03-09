"use client";

import React, { useState, useEffect } from "react";
import podcastPageStyles from "./PodcastPage.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import qs from "qs";
import { getStrapiMedia, formatDate } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const PodcastPage = () => {
  const [sectionHeaderData, setSectionHeaderData] = useState(null);
  const [podcastData, setPodcastData] = useState(null);
  const pathname = usePathname();

  const sectionHeaderQuery = qs.stringify(
    {
      populate: {
        podcastPageHeader: {
          populate: ["image"],
        },
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
      sort: ["episodeNumber:desc"],
      pagination: {
        page: 1,
        pageSize: 5,
      },
    },
    {
      encodeValuesOnly: true,
    },
  );

  useEffect(() => {
    const fetchSectionHeader = async () => {
      const response = await fetch(`/api/podcast-page?${sectionHeaderQuery}`);
      const data = await response.json();
      console.log(data?.data?.podcastPageHeader);
      setSectionHeaderData(data?.data?.podcastPageHeader);
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
    <section className={podcastPageStyles.container}>
      <Container>
        <Row>
          <Col>
            <div>
              {sectionHeaderData?.image && (
                <Image
                  src={getStrapiMedia(sectionHeaderData?.image?.url)}
                  width={sectionHeaderData?.image?.width}
                  height={sectionHeaderData?.image?.height}
                  alt={sectionHeaderData?.image?.name}
                  className={podcastPageStyles.headerImage}
                />
              )}
            </div>
          </Col>
        </Row>
        <Row className={podcastPageStyles.podcastRow}>
          {podcastData?.map((podcast) => (
            <Link
              href={`${pathname}/${podcast?.slug}`}
              key={podcast.id}
              className="text-decoration-none"
            >
              <Col lg={12}>
                <Row className={podcastPageStyles.podcastItemContainer}>
                  <Col lg={8}>
                    <div className="d-flex align-items-lg-center flex-lg-row flex-md-row flex-column">
                      <h4 className={podcastPageStyles.episodeNumber}>
                        {podcast.episodeNumber.replace("Ep ", "")}
                      </h4>
                      <div className={podcastPageStyles.podcastImageContainer}>
                        {podcast?.image && (
                          <Image
                            src={getStrapiMedia(podcast?.image?.url)}
                            width={podcast?.image?.width}
                            height={podcast?.image?.height}
                            alt={podcast?.image?.name}
                            className={podcastPageStyles.podcastImage}
                          />
                        )}
                        <div
                          className={`${podcastPageStyles.imageTextContainer} position-absolute top-0 start-0`}
                        >
                          <h2 className={podcastPageStyles.imageHeading}>
                            Fyrre
                          </h2>
                          <h4 className={podcastPageStyles.imageSubheading}>
                            Podcast
                          </h4>
                        </div>
                        <div
                          className={`${podcastPageStyles.imageTextContainer} position-absolute bottom-0 start-0`}
                        >
                          <span className={podcastPageStyles.episodeText}>
                            {podcast?.episodeNumber}
                          </span>
                        </div>
                        <div
                          className={`${podcastPageStyles.imageTextContainer} position-absolute bottom-0 end-0`}
                        >
                          <svg
                            width="51"
                            height="51"
                            viewBox="0 0 51 51"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              y="47.314"
                              width="50.7325"
                              height="3.38217"
                              fill="white"
                            />
                            <rect
                              x="47.3135"
                              width="3.38217"
                              height="50.7325"
                              fill="white"
                            />
                            <rect
                              x="4.06982"
                              y="6.61377"
                              width="3.38217"
                              height="62.5559"
                              transform="rotate(-45 4.06982 6.61377)"
                              fill="white"
                            />
                          </svg>
                        </div>
                      </div>
                      <h3 className={podcastPageStyles.podcastTitle}>
                        {podcast?.title}
                      </h3>
                    </div>
                  </Col>
                  <Col lg={4}>
                    <div className="d-flex align-items-center">
                      <span className={podcastPageStyles.dateTextContainer}>
                        <span>Date</span> {formatDate(podcast?.publicationDate)}
                      </span>
                      <span className={podcastPageStyles.durationTextContainer}>
                        <span>Duration</span> {podcast?.duration}
                      </span>
                      <span className={podcastPageStyles.viewAllLink}>
                        Listen
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
                      </span>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Link>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default PodcastPage;
