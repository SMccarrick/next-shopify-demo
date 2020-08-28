import React, { useState } from "react";
import { EmptyState, Layout, Page } from "@shopify/polaris";
import { ResourcePicker } from "@shopify/app-bridge-react";

const Index: React.FC = () => {
  const [modal, setModal] = useState(false);
  return (
    <Page>
      <ResourcePicker resourceType="Product" showVariants={false} open={modal} onCancel={() => setModal(false)} />
      <Layout>
        <EmptyState
          heading="Manage your inventory transfers"
          action={{ content: "Add transfer", onAction: () => setModal(true) }}
          secondaryAction={{ content: "Learn more", url: "https://help.shopify.com" }}
          image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
        >
          <p>Select products to add custom script for</p>
        </EmptyState>
      </Layout>
    </Page>
  );
};

export default Index;
