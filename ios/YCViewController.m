//
//  YCViewController.m
//  RNLoginDemo
//
//  Created by liuyanchi on 2018/5/9.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "YCViewController.h"
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <React/RCTBridgeModule.h>
#import "YCCustomVC.h"

@interface YCViewController ()<RCTBridgeModule>

@end

@implementation YCViewController
RCT_EXPORT_MODULE()
RCT_EXPORT_METHOD(RNInvokeOCCallBack:(NSDictionary *)dictionary callback:(RCTResponseSenderBlock)callback){
  dispatch_async(dispatch_get_main_queue(), ^{
    [[NSNotificationCenter defaultCenter] postNotificationName:@"NSNotificationCenter" object:nil userInfo:@{@"dict":dictionary}];
  });
  callback(@[[NSNull null], @"原生字段"]);
}

- (void)Hello:(NSNotification *)nofi {
  YCCustomVC *VC = [YCCustomVC new];
  VC.buttonName = nofi.userInfo[@"dict"][@"name"];
  [self presentViewController:VC animated:YES completion:nil];
}

- (void)viewDidLoad {
    [super viewDidLoad];
  self.view.backgroundColor = [UIColor whiteColor];
   [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(Hello:) name:@"NSNotificationCenter" object:nil ];
  
  NSURL *jsCodeLocation;
  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
  
  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"RNLoginDemo"
                                               initialProperties:nil
                                                   launchOptions:nil];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
  rootView.frame = self.view.frame;
  [self.view addSubview:rootView];

}


@end
