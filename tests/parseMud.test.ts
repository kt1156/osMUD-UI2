import MudParser from "@/services/MudParser";
import { expect, test } from "vitest";
import LightBulb from "./mud-json/example_lightbulb.json";

test("Should parse example_lightbulb", () => {
  let mud = MudParser.parse(LightBulb);
  expect(mud.systemInfo == LightBulb["ietf-mud:mud"].systeminfo).toBeTruthy();
  expect(
    mud.cacheValidity == LightBulb["ietf-mud:mud"]["cache-validity"]
  ).toBeTruthy();
  expect(
    mud.isSupported == LightBulb["ietf-mud:mud"]["is-supported"]
  ).toBeTruthy();

  let aclsNames = LightBulb["ietf-access-control-list:acls"].acl.map(
    (a) => a.name
  );
  mud.acls.forEach((acl) => {
    expect(aclsNames.includes(acl.name)).toBeTruthy();
  });
});
