"use client";

import React, { useState, useEffect } from "react";
import podcastPostPageStyles from "./PodcastPostPage.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import qs from "qs";
import { getStrapiMedia, formatDate } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import ReactMarkdown from "react-markdown";

const PodcastPostPage = ({ slug }) => {
  const [headerSideData, setHeaderSideData] = useState(null);
  const [podcastPostData, setPodcastPostData] = useState(null);

  const headerSideQuery = qs.stringify(
    {
      populate: {
        listenOnPlatforms: {
          populate: ["icon"],
        },
        shareOptions: {
          populate: ["image"],
        },
      },
    },
    {
      encodeValuesOnly: true,
      arrayFormat: "brackets",
    },
  );

  const podcastQuery = qs.stringify(
    {
      filters: {
        slug: {
          $eq: slug,
        },
      },
      populate: {
        image: true,
        audioFile: true,
      },
      // If you also had "LATEST POSTS" or similar on the episode page, you'd populate that component here:
      // latestEpisodesSection: true,
    },
    {
      encodeValuesOnly: true,
      arrayFormat: "brackets",
    },
  );

  useEffect(() => {
    const fetchHeaderSideData = async () => {
      const response = await fetch(`/api/podcast-post-page?${headerSideQuery}`);
      const data = await response.json();
      console.log(data?.data);
      setHeaderSideData(data?.data);
    };
    fetchHeaderSideData();
  }, []);

  useEffect(() => {
    const fetchPodcastPostData = async () => {
      const response = await fetch(`/api/podcasts?${podcastQuery}`);
      const data = await response.json();
      console.log(data?.data);
      setPodcastPostData(data?.data);
    };
    fetchPodcastPostData();
  }, []);

  return (
    <section className={podcastPostPageStyles.container}>
      <Container>
        <Row className={podcastPostPageStyles.postHeaderContainer}>
          <Col>
            <div className="d-flex justify-content-between align-items-center">
              <Link
                href={headerSideData?.goBackLink || "/podcast"}
                className="text-decoration-none"
              >
                <span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.828 8.77797L9.192 14.142L7.778 15.556L0 7.77797L7.778 -3.05176e-05L9.192 1.41397L3.828 6.77797L16 6.77797V8.77797L3.828 8.77797Z"
                      fill="black"
                    />
                  </svg>
                </span>
                <span className={podcastPostPageStyles.goBackText}>
                  {headerSideData?.goBackText}
                </span>
              </Link>
              <div>
                <h3 className={podcastPostPageStyles.pageLabelText}>
                  {headerSideData?.pageLabel}
                </h3>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg={9}>
            {podcastPostData?.map((podcastPost) => (
              <Row key={podcastPost.id}>
                <Col lg={4}>
                  <div className={podcastPostPageStyles.podcastImageContainer}>
                    {podcastPost?.image && (
                      <Image
                        src={getStrapiMedia(podcastPost?.image?.url)}
                        width={podcastPost?.image?.width}
                        height={podcastPost?.image?.height}
                        alt={podcastPost?.image?.name}
                        className={podcastPostPageStyles.podcastImage}
                      />
                    )}
                    <div
                      className={`${podcastPostPageStyles.imageTextContainer} position-absolute top-0 start-0`}
                    >
                      <h2 className={podcastPostPageStyles.imageHeading}>
                        Fyrre
                      </h2>
                      <h4 className={podcastPostPageStyles.imageSubheading}>
                        Podcast
                      </h4>
                    </div>
                    <div
                      className={`${podcastPostPageStyles.imageTextContainer} position-absolute bottom-0 start-0`}
                    >
                      <span className={podcastPostPageStyles.episodeText}>
                        {podcastPost?.episodeNumber}
                      </span>
                    </div>
                    <div
                      className={`${podcastPostPageStyles.imageTextContainer} position-absolute bottom-0 end-0`}
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
                  <div className={podcastPostPageStyles.ListenOnContainer}>
                    <ul className="list-unstyled">
                      <li
                        className={`${podcastPostPageStyles.authorListItems} d-flex align-items-center justify-content-between`}
                      >
                        <span className={podcastPostPageStyles.ListenOnLabel}>
                          Listen On
                        </span>
                        <div
                          className={podcastPostPageStyles.shareLinksContainer}
                        >
                          {headerSideData?.listenOnPlatforms?.map(
                            (shareLink) => (
                              <Link
                                key={shareLink.id}
                                href={shareLink?.url}
                                target="_blank"
                              >
                                {shareLink?.icon && (
                                  <Image
                                    src={getStrapiMedia(shareLink?.icon?.url)}
                                    width={shareLink?.icon?.width}
                                    height={shareLink?.icon?.height}
                                    alt={shareLink?.icon?.name}
                                  />
                                )}
                              </Link>
                            ),
                          )}
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <ul className="list-unstyled">
                      <li
                        className={`${podcastPostPageStyles.authorListItems} d-flex align-items-center justify-content-between`}
                      >
                        <span className={podcastPostPageStyles.authorListLabel}>
                          Date
                        </span>
                        <span className={podcastPostPageStyles.authorListText}>
                          {formatDate(podcastPost?.publicationDate)}
                        </span>
                      </li>
                      <li
                        className={`${podcastPostPageStyles.authorListItems} d-flex align-items-center justify-content-between`}
                      >
                        <span className={podcastPostPageStyles.authorListLabel}>
                          Duration
                        </span>
                        <span className={podcastPostPageStyles.authorListText}>
                          {podcastPost?.duration}
                        </span>
                      </li>
                      <li
                        className={`${podcastPostPageStyles.authorListItems} d-flex align-items-center justify-content-between`}
                      >
                        <span className={podcastPostPageStyles.authorListLabel}>
                          Share
                        </span>
                        <div
                          className={podcastPostPageStyles.socialLinksContainer}
                        >
                          {headerSideData?.shareOptions?.map((socialLink) => (
                            <Link key={socialLink.id} href={socialLink?.url}>
                              {socialLink?.image && (
                                <Image
                                  src={getStrapiMedia(socialLink?.image?.url)}
                                  width={socialLink?.image?.width}
                                  height={socialLink?.image?.height}
                                  alt={socialLink?.image?.name}
                                />
                              )}
                            </Link>
                          ))}
                        </div>
                      </li>
                    </ul>
                  </div>
                </Col>
                <Col lg={8}>
                  <div className={podcastPostPageStyles.markdownContainer}>
                    <h6 className={podcastPostPageStyles.episodeHeading}>
                      <span>Episode </span>
                      {podcastPost?.episodeNumber.replace("Ep ", "")}
                    </h6>
                    <h1 className={podcastPostPageStyles.postTitle}>
                      {podcastPost?.title}
                    </h1>
                    <p className={podcastPostPageStyles.descriptionText}>
                      {podcastPost?.description}
                    </p>
                    <div>
                      {podcastPost?.audioFile && (
                        <div
                          className={podcastPostPageStyles.audioPlayerContainer}
                        >
                          <audio controls>
                            <source
                              src={getStrapiMedia(podcastPost.audioFile.url)}
                              type={podcastPost.audioFile.mime}
                            />
                            Your browser does not support the audio element.{" "}
                            {/* Fallback message */}
                          </audio>
                        </div>
                      )}
                    </div>
                    <ReactMarkdown>{podcastPost?.content}</ReactMarkdown>
                  </div>
                </Col>
              </Row>
            ))}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default PodcastPostPage;
