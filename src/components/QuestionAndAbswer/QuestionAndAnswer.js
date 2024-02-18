import React, { useState } from "react";
import { BiUpArrow, BiDownArrow } from "react-icons/bi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { BsCaretDownFill, BsCaretUpFill } from "react-icons/bs";

import style from "./QuestionAndAnswer.module.css";

const data = [
  {
    id: 1,
    question: "What is the best skincare routine for beginners?",
    answer:
      "Start with a gentle cleanser, followed by a moisturizer with SPF during the day and a heavier moisturizer at night. Incorporate a vitamin C serum for daytime and a retinol or hyaluronic acid serum at night.",
  },
  {
    id: 2,
    question: "How often should I exfoliate my skin?",
    answer:
      "It depends on your skin type. Generally, 1-3 times a week for normal to oily skin, and 1-2 times a week for dry or sensitive skin. Avoid over-exfoliating to prevent irritation.",
  },
  {
    id: 3,
    question:
      "What ingredients should I look for in anti-aging skincare products?",
    answer:
      "Look for ingredients like retinol, hyaluronic acid, vitamin C, peptides, and niacinamide, which can help improve skin texture, reduce wrinkles, and increase collagen production.",
  },
  {
    id: 4,
    question: "Do I need to use a toner in my skincare routine?",
    answer:
      "Toners can help remove any remaining traces of dirt or makeup after cleansing and balance the skin's pH levels. However, they're not essential for everyone and can be skipped if your skin doesn't benefit from them.",
  },
  {
    id: 5,
    question: "How can I treat acne-prone skin without drying it out?",
    answer:
      "Use a gentle cleanser containing salicylic acid or benzoyl peroxide to target acne-causing bacteria. Follow up with an oil-free moisturizer and spot treatment as needed.",
  },
  {
    id: 6,
    question: "Is it necessary to use a separate eye cream?",
    answer:
      "Eye creams can provide extra hydration and target specific concerns like dark circles or fine lines. While not necessary, they can be beneficial for those with sensitive or aging skin.",
  },
  {
    id: 7,
    question: "Should I apply sunscreen even if I'm indoors all day?",
    answer:
      "Yes, UV rays can penetrate windows and cause skin damage even when indoors. It's essential to apply sunscreen every day, especially if you're near windows or spend time in front of electronic screens.",
  },
  {
    id: 8,
    question: "How long does it take to see results from skincare products?",
    answer:
      "Results can vary depending on the product and your skin type. Generally, it may take a few weeks to a few months to see significant improvements, so be patient and consistent with your routine.",
  },
  {
    id: 9,
    question: "Can I use multiple active ingredients in my skincare routine?",
    answer:
      "Yes, but it's essential to introduce them gradually to prevent irritation or sensitization. Start with one active ingredient at a time and patch-test new products before applying them to your entire face.",
  },
  {
    id: 10,
    question:
      "What should I do if I experience irritation from a skincare product?",
    answer:
      "Discontinue use of the product immediately and apply a soothing, fragrance-free moisturizer. If irritation persists, consult a dermatologist for further guidance.",
  },
  {
    id: 11,
    question: "How can I find the right skincare products for my skin type?",
    answer:
      "Consider factors such as your skin type (dry, oily, combination, sensitive), concerns (acne, aging, hyperpigmentation), and any allergies or sensitivities. Patch-testing and researching ingredients can also help determine suitable products.",
  },
  {
    id: 12,
    question: "Is it okay to use expired skincare products?",
    answer:
      "Expired skincare products may not be as effective and could potentially cause irritation or infections. It's best to dispose of them and replace them with fresh products.",
  },
  {
    id: 13,
    question: "Can I use the same skincare products year-round?",
    answer:
      "Your skin's needs can change with the seasons, so it's a good idea to adjust your skincare routine accordingly. For example, you may need lighter moisturizers in the summer and richer ones in the winter.",
  },
  {
    id: 14,
    question: "Should I moisturize if I have oily skin?",
    answer:
      "Yes, even oily skin needs hydration. Look for oil-free or non-comedogenic moisturizers that won't clog pores and can help balance oil production.",
  },
  {
    id: 15,
    question: "What's the difference between physical and chemical sunscreen?",
    answer:
      "Physical sunscreens contain mineral ingredients like zinc oxide or titanium dioxide, which sit on top of the skin and reflect UV rays. Chemical sunscreens contain organic compounds that absorb UV rays and convert them into heat.",
  },
  {
    id: 16,
    question: "Can I use skincare products during pregnancy?",
    answer:
      "Some skincare ingredients, like retinoids and salicylic acid, may not be safe during pregnancy. It's best to consult with your healthcare provider and avoid potentially harmful ingredients.",
  },
  {
    id: 17,
    question: "How can I prevent premature aging?",
    answer:
      "In addition to using sunscreen daily, you can prevent premature aging by avoiding smoking, staying hydrated, eating a healthy diet rich in antioxidants, getting enough sleep, and managing stress.",
  },
  {
    id: 18,
    question: "What's the best way to remove makeup?",
    answer:
      "Use a gentle makeup remover or cleansing oil to dissolve makeup, followed by a water-based cleanser to remove any remaining residue. Avoid harsh rubbing or scrubbing, especially around the delicate eye area.",
  },
  {
    id: 19,
    question: "Are natural skincare products better than synthetic ones?",
    answer:
      "It depends on your preferences and skin needs. Natural products may contain fewer synthetic chemicals and be better for sensitive skin, but efficacy can vary. Look for products with evidence-based ingredients.",
  },
  {
    id: 20,
    question: "How can I improve my skincare routine on a budget?",
    answer:
      "Focus on essential products like cleansers, moisturizers, and sunscreen, and prioritize quality over quantity. Look for multi-tasking products and consider DIY options like homemade masks or oil blends.",
  },
];
function QuestionAndAnswer() {
  const [displayedAnswers, setDisplayedAnswers] = useState({});
  const [upArrowVisible, setUpArrowVisible] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const toggleAnswer = (id) => {
    setDisplayedAnswers((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
    setUpArrowVisible(!upArrowVisible);
    setSelectedQuestion(id);
  };

  return (
    <main className={style.container}>
      {data.map((item) => (
        <div className={style.content} key={item.id}>
          <div className={style.question}>
            <p>{item.question}</p>
            {displayedAnswers[item.id] ? (
              <BsCaretUpFill
                onClick={() => toggleAnswer(item.id)}
                style={{
                  width: "24px",
                  height: "24px",
                  cursor: "pointer",
                  display: upArrowVisible ? "block" : "none",
                }}
              />
            ) : (
              <BsCaretDownFill
                onClick={() => toggleAnswer(item.id)}
                style={{ width: "24px", height: "24px", cursor: "pointer" }}
              />
            )}
          </div>
          <div
            className={`${style.answer} ${
              displayedAnswers[item.id] ? style.show : ""
            }`}
          >
            <p>{item.answer}</p>
            {selectedQuestion === item.id && (
              <div className={style.slug}>
                <p>{item.benefit}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </main>
  );
}

export default QuestionAndAnswer;
