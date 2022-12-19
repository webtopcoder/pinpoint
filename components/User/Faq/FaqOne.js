import React from "react";
import Accordion from "./Accordion";

const questionsAnswers = [
  {
    question: "What is Pinpoint Food Truck?",
    answer:
      "Pinpoint is THE place for Foodies and Food Trucks! Foodies will always be able to see an active live map of the Food Trucks in their area. Foodies can also communicate directly with their favorite trucks!",
  },
  {
    question: "Is Pinpoint free?",
    answer:
      "Yes! We are simply here to provide a platform to increase foot traffic for our community Food Trucks! Foodies can register with Pinpoint at no cost!",
  },
  {
    question: "Where is Pinpoint located?",
    answer: `Pinpoint will be where the Food Trucks are! As long as your favorite truck is on our platform, you will have access to them! Psst! Foodies.. help us , help YOU!`,
  },
  {
    question: "How do I join Pinpoint?",
    answer: `Simple! Upon registration, give us your name, email & select whether you are a Foodie or a Food Truck. Boom! Done. (Make sure you build that profile!)`,
  },
  {
    question: "Why should I join Pinpoint?",
    answer: `I shouldn’t have to explain this to you… Sign up, you’ll see..`,
  },
  {
    question: "Can I have a reaview on my favorite Food Truck?",
    answer: `Yes! Pinpoint allows you to communicate in private or public with your favorite food truck! You can also rate their truck and communicate with other Foodie groupies as well!`,
  },
  {
    question: "How do I contact Pinpoint Food Truck?",
    answer: `j.k.. Just go over to our Contact page and shoot us a message! We will get back to you ASAP! Keep in mind.. we do not operate the food trucks. Any questions related to them, should be directed to them..`,
  },
  {
    question: "What is the goal of Pinpoint Food Truck?",
    answer: `A dock which you can use to connect your console to the television for traditional gameplay`,
  },
  {
    question: "Where can I go for help?",
    answer: `We are aiming to be the Foodie Media platform that we’ve long begged for! Enough of these drama filled social media platforms! We will load your content with nothing but mouth watering food… (only thing missing is those cute kitten videos!)

    By the time we’re done, all Foodies will have access to any Food Truck in America at the tip of their fingers.. (Maybe other vendors as well..? Stay tuned)`,
  },
];

const FaqOne = () => {
  return (
    <div className="faq-area bg-black pb-75 pin-faq">
      <div className="container">
        <div className="faq-accordion-content">
          <div className="box">
            <h3>Getting Started</h3>
            <div className="accordion" id="faqAccordion">
              <Accordion questionsAnswers={questionsAnswers} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqOne;
