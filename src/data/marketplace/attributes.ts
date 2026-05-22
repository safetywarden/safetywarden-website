import { Attribute } from '../../types/marketplace';

export const attributes: Attribute[] = [
  // Fire Extinguisher Attributes
  {
    attribute_code: 'capacity',
    name: 'Capacity',
    datatype: 'number',
    unit: 'kg/L',
    facet: true,
    applies_to: ['fire-extinguishers']
  },
  {
    attribute_code: 'extinguisher_type',
    name: 'Type',
    datatype: 'multiselect',
    facet: true,
    applies_to: ['fire-extinguishers']
  },
  {
    attribute_code: 'fire_class',
    name: 'Fire Class',
    datatype: 'multiselect',
    facet: true,
    applies_to: ['fire-extinguishers']
  },
  
  // General Equipment Attributes
  {
    attribute_code: 'voltage',
    name: 'Voltage',
    datatype: 'number',
    unit: 'V',
    facet: true,
    applies_to: ['fire-alarms', 'emergency-lights', 'exit-signs']
  },
  {
    attribute_code: 'power_consumption',
    name: 'Power Consumption',
    datatype: 'number',
    unit: 'W',
    facet: false,
    applies_to: ['emergency-lights', 'exit-signs']
  },
  {
    attribute_code: 'battery_backup',
    name: 'Battery Backup',
    datatype: 'number',
    unit: 'hours',
    facet: true,
    applies_to: ['emergency-lights', 'exit-signs']
  },
  
  // Material Attributes
  {
    attribute_code: 'material',
    name: 'Material',
    datatype: 'multiselect',
    facet: true,
    applies_to: ['safety-helmets', 'safety-shoes', 'safety-signage', 'fire-doors']
  },
  {
    attribute_code: 'size',
    name: 'Size',
    datatype: 'multiselect',
    facet: true,
    applies_to: ['safety-helmets', 'safety-shoes', 'safety-gloves', 'safety-signage']
  },
  {
    attribute_code: 'color',
    name: 'Color',
    datatype: 'multiselect',
    facet: true,
    applies_to: ['safety-helmets', 'safety-shoes', 'safety-gloves', 'safety-signage']
  },
  
  // Door Attributes
  {
    attribute_code: 'fire_rating',
    name: 'Fire Rating',
    datatype: 'multiselect',
    unit: 'minutes',
    facet: true,
    applies_to: ['fire-doors']
  },
  {
    attribute_code: 'door_width',
    name: 'Door Width',
    datatype: 'number',
    unit: 'mm',
    facet: true,
    applies_to: ['fire-doors']
  },
  {
    attribute_code: 'door_height',
    name: 'Door Height',
    datatype: 'number',
    unit: 'mm',
    facet: true,
    applies_to: ['fire-doors']
  },
  
  // Service Attributes
  {
    attribute_code: 'service_type',
    name: 'Service Type',
    datatype: 'multiselect',
    facet: true,
    applies_to: ['fire-audit', 'training-services', 'maintenance']
  },
  {
    attribute_code: 'coverage_area',
    name: 'Coverage Area',
    datatype: 'multiselect',
    facet: true,
    applies_to: ['fire-audit', 'training-services', 'maintenance']
  },
  {
    attribute_code: 'certification_provided',
    name: 'Certification Provided',
    datatype: 'multiselect',
    facet: true,
    applies_to: ['training-services']
  }
];

export const getAttributesByCategory = (categoryId: string): Attribute[] => {
  return attributes.filter(attr => attr.applies_to.includes(categoryId));
};

export const getFacetAttributes = (): Attribute[] => {
  return attributes.filter(attr => attr.facet);
};