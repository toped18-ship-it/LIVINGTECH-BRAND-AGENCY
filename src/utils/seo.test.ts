import { test } from 'node:test';
import assert from 'node:assert';
import {
  SERVICE_SEO_REGISTRY,
  generateComprehensiveHomepageSchema,
  BASE_URL
} from './seo.ts';

test('SERVICE_SEO_REGISTRY contains Graphic Design with required SEO keywords and valid Service schema', () => {
  const graphicDesign = SERVICE_SEO_REGISTRY['graphic-design-branding'];
  assert.ok(graphicDesign, 'Graphic design service should exist in registry');
  assert.strictEqual(graphicDesign.id, 'graphic-design-branding');
  assert.ok(graphicDesign.metaTitle.includes('Graphic Design'), 'Meta title must include Graphic Design');
  assert.ok(graphicDesign.metaDescription.toLowerCase().includes('graphic design'), 'Meta description must include graphic design');
  
  // Keyword verification
  assert.ok(graphicDesign.targetKeywords.includes('Graphic design'), 'Must include exact keyword "Graphic design"');
  assert.ok(graphicDesign.targetKeywords.some(k => k.includes('Kogi State')), 'Must target regional queries in Kogi State');

  // Schema verification
  const schema = graphicDesign.schemaData;
  assert.strictEqual(schema['@context'], 'https://schema.org');
  assert.strictEqual(schema['@type'], 'Service');
  assert.strictEqual(schema['name'], 'Graphic Design and Branding Services');
  assert.strictEqual(schema['alternateName'], 'Graphic Design');
  assert.strictEqual(schema['serviceType'], 'Graphic Design');
  assert.ok(schema['description'], 'Schema must include rich description');
  assert.ok(schema['hasOfferCatalog'], 'Graphic design must have offer catalog with services');
});

test('SERVICE_SEO_REGISTRY contains Computer Training with Course and Service schema', () => {
  const compTraining = SERVICE_SEO_REGISTRY['computer-training'];
  assert.ok(compTraining, 'Computer training must exist in registry');
  assert.strictEqual(compTraining.id, 'computer-training');
  assert.ok(compTraining.metaTitle.includes('Computer Training'), 'Meta title must include Computer Training');
  assert.ok(compTraining.metaDescription.toLowerCase().includes('computer training'), 'Meta description must include computer training');

  // Keyword verification
  assert.ok(compTraining.targetKeywords.includes('Computer training'), 'Must include exact keyword "Computer training"');
  assert.ok(compTraining.targetKeywords.includes('Computer training in Abocho'), 'Must target Abocho location');
  assert.ok(compTraining.targetKeywords.includes('Computer training in Kogi State'), 'Must target Kogi State');

  // Schema verification
  const schema = compTraining.schemaData;
  assert.strictEqual(schema['@context'], 'https://schema.org');
  assert.deepStrictEqual(schema['@type'], ['Service', 'Course']);
  assert.strictEqual(schema['alternateName'], 'Computer Training');
  assert.strictEqual(schema['courseCode'], 'LT-COMP-101');
  assert.ok(Array.isArray(schema['teaches']), 'Course should define topics taught');
  assert.ok(schema['hasCourseInstance'], 'Course should have instance with location and mode');
});

test('SERVICE_SEO_REGISTRY contains Youth Training program with Course schema', () => {
  const youthTraining = SERVICE_SEO_REGISTRY['youth-training'];
  assert.ok(youthTraining, 'Youth training program should exist');
  assert.strictEqual(youthTraining.schemaType, 'Course');
  assert.ok(youthTraining.targetKeywords.includes('Youth computer training'));
  assert.strictEqual(youthTraining.schemaData['@type'], 'Course');
});

test('generateComprehensiveHomepageSchema builds valid @graph containing LocalBusiness, WebSite, ItemList, and all Services', () => {
  const rootSchema = generateComprehensiveHomepageSchema();
  assert.strictEqual(rootSchema['@context'], 'https://schema.org');
  assert.ok(Array.isArray(rootSchema['@graph']), '@graph must be an array');

  const graph = rootSchema['@graph'] as Record<string, unknown>[];
  const business = graph.find((item) => item['@id'] === `${BASE_URL}/#business`);
  assert.ok(business, 'Must include business schema');
  assert.strictEqual(business['name'], 'LIVINGTECH BRAND AGENCY');

  const website = graph.find((item) => item['@id'] === `${BASE_URL}/#website`);
  assert.ok(website, 'Must include website schema');

  const itemList = graph.find((item) => item['@id'] === `${BASE_URL}/#services-list`);
  assert.ok(itemList, 'Must include services ItemList');

  // Verify that Graphic Design and Computer training are in the @graph
  const hasGraphicDesign = graph.some((item) => item['@id'] === `${BASE_URL}/#service-graphic-design-branding`);
  const hasComputerTraining = graph.some((item) => item['@id'] === `${BASE_URL}/#service-computer-training`);
  assert.ok(hasGraphicDesign, 'Graph must include service-graphic-design-branding');
  assert.ok(hasComputerTraining, 'Graph must include service-computer-training');
});
