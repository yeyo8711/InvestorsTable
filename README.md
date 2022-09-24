## Investors Table - Fundraising Project


#### 🚀 Running on Binance Smart Chani Testnet
#### 📑 Contract Address: 0x4c45914f6659B232716092d9F91934edb5924b50
#### 💥 Demo: https://investors-table-65ou.vercel.app/
<br/>

### Features ###
 - Send BNB to a receiver wallet
 - Display the donators on a table list
 - Direct link to Twitter page
 - Static provider ( doesn't rely on user having Metamask installed )
 - Network swither on demand ( no invasive pop-ups on load )
 - Detect and ask the user to add the network if he/she doesn't have it, when trying to switch
 - Form validation before sending transaction 
 <br/>
 
### 📝 Todo ###
 - Check the balance of the user on the form and narrow the donation values based on that
 - Break "handleDonation (./src/Banner.jsx )" on line 53 if the user is not on the right chain, currently 
 the function proceeds to the transaction and fails anyway.
 - Disable "connectWallet (.src/components/Header )" if the user is already connected
 


### ⚠️ Bugs and unexpected behaviors ###
 - After the user rejects a transaction, form validation will point to "invalid" even if the user 
 has all required inputs filled correctly. A refresh or change on the input values will fix the issue.
 - User can call "connectWallet" even when already logged in
 - Table of investors gets re-fetched when useEffect changes, the result is a duplicated state,
 since it adds to the previous data without replacing it. I think its impossible for the user the get 
 this error, but might be a good idea to check it out.
 
 
 
  
