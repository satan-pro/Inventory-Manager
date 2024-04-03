const sampleData = [
    {
      order_id: 1001,
      date: "2024-03-01",
      customer: "John Doe",
      sales_channel: "Online",
      items_status: "Shipped",
      products: [
        {
          product_name: "Laptop",
          items: 1,
          price: 1200,
          vendor: "TechMart",
          delivery_agent: "FastShip",
        },
        {
          product_name: "Mouse",
          items: 1,
          price: 20,
          vendor: "TechGadgets",
          delivery_agent: "FastShip",
        },
        {
          product_name: "Keyboard",
          items: 1,
          price: 50,
          vendor: "TechGadgets",
          delivery_agent: "FastShip",
        }
      ]
    },
    {
      order_id: 1002,
      date: "2024-03-02",
      customer: "Jane Smith",
      sales_channel: "In-store",
      items_status: "Delivered",
      products: [
        {
          product_name: "Smartphone",
          items: 2,
          price: 800,
          vendor: "GizmoCo",
          delivery_agent: "QuickDeliver",
        },
        {
          product_name: "Headphones",
          items: 1,
          price: 100,
          vendor: "AudioEmporium",
          delivery_agent: "QuickDeliver",
        }
      ]
    },
    {
      order_id: 1003,
      date: "2024-03-03",
      customer: "Mike Johnson",
      sales_channel: "Online",
      items_status: "Pending",
      products: [
        {
          product_name: "Monitor",
          items: 1,
          price: 300,
          vendor: "TechMart",
          delivery_agent: "SpeedyShip",
        },
        {
          product_name: "Webcam",
          items: 1,
          price: 50,
          vendor: "TechGadgets",
          delivery_agent: "SpeedyShip",
        }
      ]
    },
    {
      order_id: 1004,
      date: "2024-03-04",
      customer: "Emily Brown",
      sales_channel: "Phone",
      items_status: "Processing",
      products: [
        {
          product_name: "Tablet",
          items: 1,
          price: 300,
          vendor: "PadCorp",
          delivery_agent: "ExpressDeliver",
        }
      ]
    },
    {
      order_id: 1005,
      date: "2024-03-05",
      customer: "Chris Wilson",
      sales_channel: "In-store",
      items_status: "Shipped",
      products: [
        {
          product_name: "Camera",
          items: 1,
          price: 500,
          vendor: "LensWorld",
          delivery_agent: "SwiftShip",
        },
        {
          product_name: "Memory Card",
          items: 1,
          price: 30,
          vendor: "MemoryMasters",
          delivery_agent: "SwiftShip",
        }
      ]
    },
    {
      order_id: 1006,
      date: "2024-03-06",
      customer: "Sarah Johnson",
      sales_channel: "Phone",
      items_status: "Shipped",
      products: [
        {
          product_name: "Printer",
          items: 1,
          price: 200,
          vendor: "PrintMaster",
          delivery_agent: "SpeedyShip",
        }
      ]
    },
    {
      order_id: 1007,
      date: "2024-03-07",
      customer: "David Lee",
      sales_channel: "Online",
      items_status: "Delivered",
      products: [
        {
          product_name: "External Hard Drive",
          items: 1,
          price: 150,
          vendor: "StorageSolutions",
          delivery_agent: "QuickDeliver",
        }
      ]
    },
    {
      order_id: 1008,
      date: "2024-03-08",
      customer: "Anna Martinez",
      sales_channel: "In-store",
      items_status: "Processing",
      products: [
        {
          product_name: "Smartwatch",
          items: 1,
          price: 250,
          vendor: "WearableTech",
          delivery_agent: "ExpressDeliver",
        }
      ]
    },
    {
      order_id: 1009,
      date: "2024-03-09",
      customer: "Mark Taylor",
      sales_channel: "Phone",
      items_status: "Shipped",
      products: [
        {
          product_name: "Wireless Mouse",
          items: 1,
          price: 30,
          vendor: "TechGadgets",
          delivery_agent: "SwiftShip",
        }
      ]
    },
    {
      order_id: 1010,
      date: "2024-03-10",
      customer: "Olivia Brown",
      sales_channel: "Online",
      items_status: "Pending",
      products: [
        {
          product_name: "USB Flash Drive",
          items: 2,
          price: 20,
          vendor: "MemoryMasters",
          delivery_agent: "SpeedyShip",
        },
        {
          product_name: "Ethernet Cable",
          items: 1,
          price: 10,
          vendor: "ConnectivityCorp",
          delivery_agent: "SpeedyShip",
        }
      ]
    }
  ];
    
  
module.exports ={sampleData};
  