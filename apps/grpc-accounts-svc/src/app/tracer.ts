'use strict';

import * as grpc from '@grpc/grpc-js';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
// import { JaegerExporter } from '@opentelemetry/exporter-jaeger';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc';
import { Resource } from '@opentelemetry/resources';
import * as opentelemetry from '@opentelemetry/sdk-node';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { PrismaInstrumentation } from '@prisma/instrumentation';

// Configure the SDK to export telemetry data to the console
// Enable all auto-instrumentations from the meta package
// Configure the SDK to export telemetry data to the console
// Enable all auto-instrumentations from the meta package
// const traceExporter = new JaegerExporter({
//	endpoint: "http://joseantcordeiro.hopto.org:14268/api/traces",
//});
const exporterOptions = {
  url: 'http://joseantcordeiro.hopto.org:4317',
  credentials: grpc.credentials.createInsecure(),
};
const traceExporter = new OTLPTraceExporter(exporterOptions);

const sdk = new opentelemetry.NodeSDK({
  traceExporter,
  instrumentations: [getNodeAutoInstrumentations(), new PrismaInstrumentation()],
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'grpc-accounts-svc',
		[SemanticResourceAttributes.SERVICE_VERSION]: '0.0.1',
  }),
});

// initialize the SDK and register with the OpenTelemetry API
// this enables the API to record telemetry
sdk
  .start()
  .then(() => console.log('Tracing initialized'))
  .catch((error) => console.log('Error initializing tracing', error));

// gracefully shut down the SDK on process exit
process.on('SIGTERM', () => {
  sdk
    .shutdown()
    .then(() => console.log('Tracing terminated'))
    .catch((error) => console.log('Error terminating tracing', error))
    .finally(() => process.exit(0));
});

export default sdk;