import * as React from "react"
import { Tabs, TabsList, TabsTrigger } from "./motion-tabs"

export type PaymentTab = "KTP" | "ETOLL" | "FLO" | "TUNAI"

const tabs: { name: string; value: PaymentTab }[] = [
  { name: "KTP", value: "KTP" },
  { name: "E-TOLL", value: "ETOLL" },
  { name: "FLO", value: "FLO" },
  { name: "TUNAI", value: "TUNAI" },
]

interface TabLalinProps {
  value: PaymentTab
  onChange: (val: PaymentTab) => void
}

const TabLalin: React.FC<TabLalinProps> = ({ value, onChange }) => {
  return (
    <div className="w-full max-w-md">
      <Tabs value={value} onValueChange={onChange}>
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  )
}

export default TabLalin
