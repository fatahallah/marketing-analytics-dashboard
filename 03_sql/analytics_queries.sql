-- 1_Category_Performance
SELECT 
            SUM(MntWines) AS Total_Wines,
            SUM(MntFruits) AS Total_Fruits,
            SUM(MntMeatProducts) AS Total_Meat,
            SUM(MntFishProducts) AS Total_Fish,
            SUM(MntSweetProducts) AS Total_Sweets,
            SUM(MntGoldProds) AS Total_Gold
        FROM marketing_campaigns;

-- 2_Channel_Breakdown
SELECT 
            SUM(NumWebPurchases) AS Total_Web_Purchases,
            SUM(NumCatalogPurchases) AS Total_Catalog_Purchases,
            SUM(NumStorePurchases) AS Total_Store_Purchases
        FROM marketing_campaigns;

-- 3_Campaign_Acceptance_Rates
SELECT 
            SUM(AcceptedCmp1) AS Cmp1_Conversions,
            SUM(AcceptedCmp2) AS Cmp2_Conversions,
            SUM(AcceptedCmp3) AS Cmp3_Conversions,
            SUM(AcceptedCmp4) AS Cmp4_Conversions,
            SUM(AcceptedCmp5) AS Cmp5_Conversions,
            SUM(Response) AS Final_Campaign_Conversions
        FROM marketing_campaigns;

