import { NameSpace, Frames, SignalInfo, SignalId, Signals, SignalIds, SubscriberConfig, ClientId, Empty, PublisherConfig, Signal } from './network_api_pb'
import { NetworkServiceClient, NetworkServicePromiseClient } from './network_api_grpc_web_pb'
import { SystemServiceClient, SystemServicePromiseClient } from './system_api_grpc_web_pb'
import { DiagnosticsRequest, DiagnosticsResponse } from './diagnostics_api_pb'
import { DiagnosticsServiceClient, DiagnosticsServicePromiseClient } from './diagnostics_api_grpc_web_pb'


export default { SystemServiceClient, SystemServicePromiseClient, NetworkServiceClient, NetworkServicePromiseClient, NameSpace, Frames, SignalInfo, SignalId, SignalIds, SubscriberConfig, ClientId, Empty, DiagnosticsRequest, DiagnosticsResponse, DiagnosticsServiceClient, DiagnosticsServicePromiseClient, PublisherConfig, Signal, Signals }
