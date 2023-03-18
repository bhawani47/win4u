import React, { useEffect,useState } from 'react'
import { useNavigate } from 'react-router';
import Header from "./Header";
import AuthUser from './AuthUser.js';
import Loading from '../images/loading.png';

const Agreement = () => {
  
  const [loading, setLoading] = useState('');

  document.body.style.background = "#f1f1f1";
  const navigate = useNavigate();
  useEffect(()=>{
   AuthUser().then((data)=>{
     if(!data.message){
      navigate('/login');
     }
     setLoading('some');
   });
  },[])

  return (
    <>
      <Header back="/account" title="Risk Disclosure Agreement" />
    {loading=='' ? <div className="loading-box"><img  className="rotating loading-img" src={Loading} /></div> : <span></span>}
      <div className="agreement">
      <div  className="risk">
        <div  className="title">
          Chapter 1.Booking/Collection Description
        </div>
        <div  className="content">
          Prepayment Booking/Recycling Customer should read and understand the
          business content carefully before making prepayment bookings
          (prepayment lock price, payment settlement and shipment) /recovery or
          repurchase (prepayment lock price, shipping payment) before making
          prepayment bookings to ourwebsite:
        </div>
        <div  className="content">
          1. Before making an appointment/restoring the prepayment business, the
          customer should complete the real name authentication in the mall and
          ensure that the name, ID number, bank account number, delivery address
          and other information filled in are true, accurate and valid;
          Otherwise, the user will be liable for the consequences of false
          information.
        </div>
        <div  className="content">
          2. Customers can order gold and silver products in advance at the
          shopping centre. Orders can be cancelled by 01:30 a.m. on the same
          Saturday. When the customer pays the end payment, the mall receives
          the final payment and arranges the delivery.
        </div>
        <div  className="content">
          If the customer does not pay the final pick-up by 01:30 a.m. on
          Saturday, the customer is deemed to have made the last offer before
          the inventory and the booking is cancelled.
        </div>
        <div  className="content">
          3. Customers can make an appointment to recycle gold and silver
          products purchased at the gold point. Pre-purchase recovery requires a
          credit margin and confirmation of actual possession of gold and silver
          products purchased from the mall. Customers can cancel their
          reservation at any time before 01:30 on Saturday and the credit mark
          will be refunded after deducting the increase or decrease in the value
          of the goods within the corresponding time.
        </div>
        <div  className="content">
          If the customer fails to deliver the goods to a shopping mall or
          shopping center at the designated collection point by Saturday within
          the same week, or if the goods delivered do not meet the recycling
          standard test, the customer will be deemed to have cancelled the
          reservation recovery and will bear the logistics and testing costs.
        </div>
        <div  className="content">
          4. Counting time: Daily 01:30-05:30 for the mall warehouse inventory
          time. During the inventory period, the mall stops accepting advance
          payments for reservations/receipts.
        </div>
        <div  className="content">
          5. For further details, please refer to the Business Guidelines in the
          front page of the mall, Understanding ourwebsite.
        </div>
        <div  className="title">
          Chapter 2 Reveals the business model of ourwebsite
        </div>
        <div  className="content">
          Booking/repurchase orders, the business model for clearing balance
          shipments, uncertainties such as potential benefits and potential
          risks to the value of its merchandise due to real-time fluctuations in
          the gold and silver market, and the extent to which booking/repo risk
          stake is understood for customer booking/repo risk, Risk control
          ability and understanding of related products have high requirements.
          Customer selects pre-payment booking/repurchase, fully informed on
          behalf of the customer and understand the risks of
          prepayments/repurchase business and agree to and accept ourwebsite current
          and future relevant booking/repurchase business processes and
          management systems (collectively, the Process Systems) to develop,
          modify and publish. This Risk Disclosure (Disclosure) is intended to
          fully disclose to the Client the risk of the prepayment
          booking/repurchase business and is intended only to provide reference
          for the client to assess and determine its own risk tolerance. The
          risk disclosures described in this disclosure are for example only.
          All risk factors associated with ourwebsite Advance Booking/Repurchase are
          not detailed. Customers should also carefully understand and
          understand other possible risk factors before starting or
          participating in ourwebsite pre-payment booking/repurchase business. If the
          customer is not aware of or is not aware of this disclosure, they
          should consult ourwebsite Customer Service or the relevant regional service
          provider in a timely manner. If the Customer ultimately clicks on Risk
          Disclosure, it is deemed that the Customer fully agrees and accepts
          the full contents of this disclosure.
        </div>
        <div  className="content">
          Warm tips
        </div>
        <div  className="content">
          1.Minors under the age of 18 are not permitted to participate in The
          ourwebsite Advance Booking/Recycling.
        </div>
        <div  className="content">
          2.ourwebsite Advance Booking/Repo is only available to customers who meet
          all of the following criteria:
          <br  />① Natural persons with full civil capacity,
          legal persons of enterprises or other economic organizations
          registered in accordance with the law.
        </div>
        <div  className="content">
          ② To fully understand all risks associated with ourwebsite Advance
          Booking/Repurchase business and have a certain risk tolerance.
        </div>
        <div  className="content">
          ③ Have a certain understanding of gold and silver and its products:
        </div>
        <div  className="content">
          A. Policy-related risk disclosure, such as changes in national laws,
          regulations and policies, contingency measures, implementation of
          appropriate regulatory measures, ourwebsite regulatory system and changes
          in management methods and regulations, etc., all risks that may affect
          customer bookings/repurchases, etc., the customer must bear the losses
          incurred.
        </div>
        <div  className="content">
          B. Price fluctuations, gold, silver and other precious metals and
          their accessories are affected by a variety of factors, such as the
          international economic situation, foreign exchange, related market
          trends, supply and demand, and political situation and energy prices.
          The pricing mechanism for gold, silver and other precious metals
          products is very complex, making it difficult for customers to fully
          grasp in practice, so decisions such as advance booking/buyback are
          possible Mistakes, if the risk cannot be effectively controlled, may
          suffer losses and the customer must bear all the losses incurred as a
          result.
        </div>
        <div  className="content">
          ④ ourwebsite has enabled the provision of services through electronic
          communication technology and Internet technology. Communication
          services and hardware and software services are provided by different
          vendors and may be at risk in terms of quality and stability.
          Interruptions or delays due to communication or network failures may
          affect customer prepayment bookings/repurchases. In addition, the
          customers computer system may be attacked by viruses and/or
          cyber-hackers, resulting in the customers advance payment
          booking/repurchase not being properly and/or timely.
        </div>
        <div  className="content">
          There is also a risk that the above uncertainties may affect the
          customer’s advance payment booking/repurchase.
          <br  />
          A. The price quoted by the ourwebsite Prepayment Booking/Repo System is
          based on the systems real-time trading price and may differ slightly
          from the commodity prices in other markets.
          <br  />
          ourwebsite cannot guarantee that the above prepayment booking//repurchase
          price is fully consistent with other markets.
          <br  />
          B. At ourwebsite;, once the customers pre-payment booking/repurchase
          application submitted through the online terminal is completed, it
          cannot be withdrawn and the customer must accept the risks associated
          with such a subscription.
          <br  />
          C. ourwebsite prohibits regional service providers and their staff from
          providing any profit guarantee to customers, from engaging in prepaid
          bookings/repurchases on behalf of customers, or from sharing profits
          or risks with customers. Customer should be aware that any profit
          guarantee or commitment that ourwebsite advance booking/repurchase does not
          have a loss, profit share or risk-sharing is impossible, unfounded,
          and incorrect.
          <br  />
          D. The customers pre-paid booking / repurchase application must be
          based on the customers own decision. ourwebsite and regional service
          providers and employees do not provide booking / buyback to the
          client, nor does it constitute any commitment if the client makes a
          booking / buyback decision accordingly.
          <br  />
          E. In advance booking / buyback process, there may be occasional
          apparent errors in the offer.
          <br  />⑤ RISK-AGREEMENT
        </div>
        <div  className="content">
          Note: I have carefully read all contents of this app including Privacy
          Statement, Risk Disclosure Agreement and Risk Agreement and I am
          agreed to continue with my own risk.
        </div>
        <div  className="title">
          Cancellation and refundable Policy
        </div>
        <div  className="content">
          In case of any discrepancy we can cancel any of the orders placed by
          you. A few reasons for cancellation from our end usually include
          limitation of the product in the inventory, error in pricing, error in
          product information etc. We also have the right to check out for extra
          information for the purpose of accepting orders in a few cases. We
          make sure to notify you if in case your order is cancelled partially
          or completely or if in case any extra data is required for the purpose
          of accepting your order.
        </div>
        <div  className="content">
          Once you place the order, such order can be cancelled from your end
          before the shipping is undertaken to the destination. Once the request
          of cancellation for ready for shipping product is received by us, we
          make sure to refund the amount through the same mode of payment within
          5 working days. Cancellation of the order of Gold coin(exchanged by
          integrals) shall not be accepted as under Company’s policies.
        </div>
        <div  className="content">
          We don’t accept Cancellation requests for Smart Buy orders or
          customized jewellery orders. In specific situations when the customer
          wants the money back or wants to exchange it with other products,
          making charges of the product and stone charges, if there is any stone
          on the product shall be deducted from the payment and balance will be
          refunded back to customer account within 5 working days.
        </div>
        <div  className="content">
          If in case the amount is deducted from your account and the
          transaction has failed, the same will be refunded back to your account
          within 72 hours.
        </div>
      </div>
      </div>
    </>
  );
};

export default Agreement;
